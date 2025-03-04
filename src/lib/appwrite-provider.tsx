"use client"
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { Models, OAuthProvider, Client, Account, Avatars, ID } from "appwrite";
import {
  createUser,
  getUser,
} from "@/lib/appwrite";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { toast } from "sonner";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

const account = new Account(client);

interface AuthContextProps {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  updatePassword: (
    oldpassword: string,
    currentpassword?: string
  ) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithOAuth: (provider: OAuthProvider) => Promise<void>;
  isSignedIn: boolean;
  createEmailToken: (email: string) => Promise<void>;
  verifyEmailToken: (userId: string, token: string) => Promise<void>;
  createRecovery: (email: string) => Promise<void>;
  confirmRecovery: (
    userId: string,
    secret: string,
    password: string
  ) => Promise<void>;
  clearError: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isSignedIn = useMemo(() => !!user, [user]);

  const clearError = useCallback(() => setError(null), []);

  const clearSession = useCallback(() => {
    try {
      deleteCookie("user");
      deleteCookie("session");
      setUser(null);
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  }, []);

  const loadSession = useCallback(async () => {
    try {
      const storedUser = getCookie("user");
      const sessionExists = getCookie("session");

      if (storedUser && sessionExists === "true") {
        const parsedUser = JSON.parse(storedUser as string);
        setUser(parsedUser);
      } else {
        clearSession();
      }
    } catch (error) {
      console.error("Error loading session:", error);
      clearSession();
    } finally {
      setIsInitialized(true);
    }
  }, [clearSession]);

  const saveSession = useCallback(
    async (userData: Models.User<Models.Preferences>) => {
      try {
        // Save user data
        setCookie("user", JSON.stringify(userData), {
          maxAge: 30 * 24 * 60 * 60,
        });

        // Save session status
        setCookie("session", "true", {
          maxAge: 30 * 24 * 60 * 60,
        });

        setUser(userData);
      } catch (error) {
        console.error("Error saving session:", error);
      }
    },
    []
  );

  const signIn = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await account.createEmailPasswordSession(email, password);
        const userData = await account.get();
        await saveSession(userData);
        return userData;
      } catch (error: any) {
        const errorMessage = error.message || "Sign-in failed";
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [saveSession]
  );

  const createEmailToken = useCallback(async (email: string) => {
    try {
      await account.createEmailToken(email);
    } catch (error: any) {
      toast.error(error.message || "Failed to create email token");
      throw error;
    }
  }, []);

  const verifyEmailToken = useCallback(
    async (userId: string, token: string) => {
      try {
        await account.updateVerification(userId, token);
        toast.success("Email verified successfully");
      } catch (error: any) {
        toast.error(error.message || "Failed to verify email");
        throw error;
      }
    },
    []
  );

  const createRecovery = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const recovery = await account.createRecovery(
        email,
        process.env.NEXT_PUBLIC_RECOVERY_REDIRECT_URL ||
          "http://localhost:3000/reset-password"
      );
      toast.success("Recovery email sent");
      return recovery;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to send recovery email";
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const confirmRecovery = useCallback(
    async (userId: string, secret: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await account.updateRecovery(userId, secret, password);
        toast.success("Password reset successfully");
        return true;
      } catch (error: any) {
        const errorMessage = error.message || "Failed to reset password";
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updatePassword = useCallback(
    async (oldpassword: string, currentpassword?: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await account.updatePassword(currentpassword!, oldpassword);
        const userData = await account.get();
        await saveSession(userData);
        toast.success("Password updated successfully");
        return userData;
      } catch (error: any) {
        const errorMessage = error.message || "Failed to update password";
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [saveSession]
  );

  const signUp = useCallback(
    async (email: string, password: string, name: string) => {
      setIsLoading(true);
      try {
        await account.create("unique()", email, password, name);
        const userData = await signIn(email, password);
        return userData;
      } catch (error: any) {
        const errorMessage = error.message || "Sign-up failed";
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [signIn]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await account.deleteSession("current");
      clearSession();
    } catch (error: any) {
      console.warn("Error during logout:", error);
      clearSession();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithOAuth = useCallback(async (provider: OAuthProvider) => {
    setIsLoading(true);
    setError(null);

    try {
      const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`;

      await account.createOAuth2Session(
        provider,
        redirectUri,
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/failure`,
        ['*']
      );
    } catch (error: any) {
      const errorMessage =
        error.message || `OAuth login failed with ${provider}`;
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleOAuthCallback = useCallback(
    async (result: { secret: string; userId: string }) => {
      try {
        // Create session using Appwrite's method
        const session = await account.createSession(
          result.userId,
          result.secret
        );

        // Get user data
        const userData = await account.get();

        // Check if user exists in our database
        const existingUser = await getUser(userData.$id);

        if (!existingUser || existingUser === undefined) {
          // New user signing up - create user and subscription
          await createUser(userData.$id, {
            name: userData.name,
            email: userData.email,
          });

          // Get free trial plan
          const freetrial = await getFreePlan();
          if (!freetrial) {
            throw new Error("Failed to get free trial plan");
          }

          // Set up subscription dates
          const now = new Date();
          const start_date = now.toISOString();
          const end_date = new Date(
            now.getTime() + 14 * 24 * 60 * 60 * 1000
          ).toISOString(); // 14 days trial

          // Create subscription
          await createSubscription({
            start_date,
            end_date,
            name: freetrial.name,
            plan: freetrial.$id,
            price: freetrial.monthly_price,
            status: "active",
            user: userData.$id,
            businesses_left: freetrial.number_of_businesess,
            listings_left: freetrial.max_listings,
            total_businesses: freetrial.number_of_businesess,
            total_listings: freetrial.max_listings,
            total_ads: freetrial.max_ads,
            total_ads_left: freetrial.max_ads,
          });
        }
        
        // Save session
        await saveSession(userData);
        return userData;
      } catch (error: any) {
        console.error("OAuth callback error:", error);
        toast.error(error.message || "OAuth login failed");
        throw error;
      }
    },
    [saveSession]
  );

  // Keep OAuth callback handling simple
  useEffect(() => {
    const handleOAuthRedirect = async () => {
      if (!window.location.pathname.includes('/auth/callback')) {
        return;
      }

      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get('userId');
      const secret = urlParams.get('secret');

      if (userId && secret) {
        try {
          await handleOAuthCallback({ userId, secret });
        } catch (error) {
          console.error('Error handling OAuth redirect:', error);
          toast.error('Failed to complete OAuth login');
        }
      }
    };

    if (typeof window !== 'undefined') {
      handleOAuthRedirect();
    }
  }, [handleOAuthCallback]);

  // Only load session on mount
  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      isInitialized,
      error,
      signIn,
      updatePassword,
      signUp,
      logout,
      loginWithOAuth,
      isSignedIn,
      clearError,
      createRecovery,
      confirmRecovery,
      createEmailToken,
      verifyEmailToken,
    }),
    [
      user,
      isLoading,
      isInitialized,
      error,
      signIn,
      updatePassword,
      signUp,
      logout,
      loginWithOAuth,
      isSignedIn,
      clearError,
      createRecovery,
      confirmRecovery,
      createEmailToken,
      verifyEmailToken,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {isInitialized ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

"use server";
import {
  Client,
  Account,
  Databases,
  Query,
  Storage,
  ID,
  Messaging,
  Avatars,
} from "node-appwrite";
import { unstable_noStore as nostore } from "next/cache";
import { UserProfile } from "./types";
import { cookies } from "next/headers";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
  .setKey(process.env.APPWRITE_API_KEY as string);

const account = new Account(client);
const databases = new Databases(client); // Add database instance
const storage = new Storage(client);
const messaging = new Messaging(client);
const avatars = new Avatars(client);
const databaseid = "675351130030b8e7344f";
const userscollectionId = "67790657003488f8b7b8";

export const isAuthenticated = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  const userCookie = cookieStore.get("user");

  if (!sessionCookie || !userCookie || sessionCookie.value !== "true") {
    return false;
  }

  try {
    const userData = JSON.parse(decodeURIComponent(userCookie.value));
    return !!userData;
  } catch (error) {
    console.error("Error parsing user data from cookie:", error);
    return false;
  }
};

export const createUser = async (userid: string, user: UserProfile) => {
  try {
    const data: UserProfile = {
      ...user,
    };

    const response = await databases.createDocument(
      databaseid,
      userscollectionId,
      userid,
      data
    );

    return response;
  } catch (error) {
    console.error("Error creating user", error);
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const userResponse = await databases.listDocuments(
      databaseid,
      userscollectionId,
      [Query.equal("$id", userId)]
    );
    console.log(userResponse);
    return userResponse.documents[0];
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw new Error("Failed to fetch user details");
  }
};

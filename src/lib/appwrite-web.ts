import { Client, Avatars } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

const avatars = new Avatars(client);

export const getUserAvatar = async ({ name }: { name: string }) => {
  try {
    const result = avatars.getInitials(name, 100, 100);
    return result;
  } catch (error) {
    console.error("Error getting avatar:", error);
    throw new Error("Failed to get user avatar");
  }
};

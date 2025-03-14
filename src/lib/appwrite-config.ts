import { Client, Databases, Storage } from "node-appwrite"

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)

const databases = new Databases(client)
const storage = new Storage(client)

export { databases, storage }


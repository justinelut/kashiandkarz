import { Databases, Client, Storage } from "node-appwrite";


// Initialize Appwrite client
const client = new Client()
	.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
	.setKey(process.env.APPWRITE_API_KEY!); // Use server-side API key

export const database = new Databases(client);
export const storage = new Storage(client);
export const databaseId = process.env.APPWRITE_DATABASE_ID as string;


//collections id
export const carinfocollectionId = "67cf10af003268a33d9f"; //step one create basic deatails, also this is the main collection which we will be updating with other collections ids using relationships
export const specificcarfeaturescollectionid = "67cf1666001ed0b21def"; //in relation to the cainfocollection
export const carspecificationscollectionid = "67cf13670024a02affcb"; //in relation to the cainfocollection
export const ownershipdocumentationcollectionid = "67cf18060032a0e926cd"; //in relation to the cainfocollection
export const pricingpaymentcollectionid = "67cf18f100055d893194"; //in relation to the cainfocollection

//the below collections should only be used for fetching data not creating
export const allcarfeaturescollectionid = "67cee7db000302166d7b";
export const carcolorscollectionid = "67c86a92000277171665";
export const carTypeCollectionId = "67cee30c001fd65329ac";
export const carmakecollectionsId = "67c72fe00000db170b7b";
export const callbackscollectionid = ""
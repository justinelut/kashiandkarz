// Database IDs
export const databaseId = process.env.APPWRITE_DATABASE_ID || "";
export const carsCollectionId = "67cf10af003268a33d9f";
export const bigDealsCollectionId = process.env.APPWRITE_BIG_DEALS_COLLECTION_ID || "";
export const carImagesCollectionId = "car_images";
export const companyCollectionId = "company";
export const messagesCollectionId = "messages";
export const callbacksCollectionId = "callbacks";
export const testDrivesCollectionId = "test_drives";

// Collection IDs from the actions file

export const exteriorFeatureCollectionId = "exteriorfeatures";
export const interiorFeatureCollectionId = "interiorfeatures";
export const safetyFeatureCollectionId = "safetyfeatures";


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

export const usercollectionid = "67d16058002af6428ea6";
export const businesscollectionid = "67d73dc3001ee0da4374"
// Storage bucket IDs
export const storageBucketId = process.env.APPWRITE_STORAGE_BUCKET_ID || "";

// Route paths
export const DASHBOARD_PATH = "/dashboard";
export const CARS_PATH = `${DASHBOARD_PATH}/cars`;
export const EDIT_CAR_PATH = `${CARS_PATH}/edit`;
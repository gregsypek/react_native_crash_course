import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const config = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "jsm.aora",
	projectId: "6698c0dd003be42dfd3c",
	databaseId: "6698c203001eceb6787c",
	userCollectionId: "6698c2610014b51c841e",
	videoCollectionId: "6698c28700339b980535",
	storageId: "6698c92c001f99983c27",
};
const {
	endpoint,
	platform,
	projectId,
	databaseId,
	userCollectionId,
	videoCollectionId,
	storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
	.setEndpoint(config.endpoint) // Your Appwrite Endpoint
	.setProject(config.projectId) // Your project ID
	.setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (email, password, username) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);

		if (!newAccount) throw Error;
		const avatarUrl = avatars.getInitials(username);

		await signIn(email, password);
		const newUser = await databases.createDocument(
			config.databaseId,
			config.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email,
				username,
				avatar: avatarUrl,
			}
		);
		return newUser;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export const signIn = async (email, password) => {
	try {
		const session = await account.createEmailSession(email, password);
		return session;
	} catch (error) {
		throw new Error(error);
	}

	// try {
	// 	if (!account.getSession()) {
	// 		const session = await account.createEmailSession(email, password);
	// 		return session;
	// 	} else {
	// 		await account.deleteSession("current");
	// 		const session = await account.createEmailSession(email, password);
	// 		return session;
	// 	}
	// } catch (error) {
	// 	throw new Error(error);
	// }
};
// export const getCurrentUser = async () => {
// 	try {
// 		const currentAccount = await account.get();

// 		if (!currentAccount) throw Error;

// 		const currentUser = await databases.listDocuments(
// 			config.databaseId,
// 			config.userCollectionId,
// 			[Query.equal("accountId", currentAccount.$id)]
// 		);
// 		if (!currentUser) throw Error;

// 		return currentUser.documents[0];
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) throw Error;

		// const currentUser = await databases.listDocuments(
		//   config.databaseId,
		//   config.userCollectionId,
		//   [Query.equal("accountId", currentAccount.$id)]
		// );

		// if (!currentUser) throw Error;

		// return currentUser.documents[0];

		return currentAccount;
	} catch (error) {
		throw new Error(error);
	}
};

export const getAllPosts = async () => {
	try {
		const posts = await databases.listDocuments(databaseId, videoCollectionId);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

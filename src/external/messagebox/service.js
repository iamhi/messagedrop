import { whoAmIRequest, loginRequest, myMessagesRequest, sendMessageRequest } from './requests';

let cachedUserDetails = {};
let cachedError = {};

export const refreshDetails = async () => {
	const { 
		error,
		...userDetails
		} = await whoAmIRequest();

	cachedUserDetails = userDetails;
	cachedError = error;

 return { error, userDetails };
};

export const login = async (username, password) => {
	const { error, ...userDetails } = await loginRequest(username, password);

	cachedUserDetails = userDetails;
	cachedError = error;

 return { error, userDetails };
};

export const getMyMessages = async () => {
	return await myMessagesRequest();
};

export const sendMessage = async (content) => {
 return await sendMessageRequest(content);
};

export const getUserDetails = () => {};

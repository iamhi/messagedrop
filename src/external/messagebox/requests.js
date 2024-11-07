const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
};

export const whoAmIRequest = async () => {
	const response = await fetch('https://api.ibeenhi.com/hi-zone-api/frontline/user/whoami', {
		credentials: 'include',
		headers: headers,
	});

	return await response.json();
};

export const loginRequest = async (username, password) => {
	const response = await fetch('https://api.ibeenhi.com/hi-zone-api/frontline/user/login', {
		credentials: 'include',
		headers: headers,
		method: 'POST',
		body: JSON.stringify({ username, password })
	});

	return await response.json();
};

export const myMessagesRequest = async () => {
	const response = await fetch('https://api.ibeenhi.com/hi-zone-api/frontline/messagebox/', {
		credentials: 'include',
		headers: headers,
	});

	return await response.json();
};

export const sendMessageRequest = async (content) => {
	const response = await fetch('https://api.ibeenhi.com/hi-zone-api/frontline/messagebox/', {
		credentials: 'include',
		headers: headers,
		method: 'POST',
		body: JSON.stringify({ type: 'MessageBox', subtype: 'UserMessage', content })
	});

	return await response.json();
};

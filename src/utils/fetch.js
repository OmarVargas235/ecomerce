export const requestWithoutToken = async (url = "", formData={}, method="GET") => {

	if (method === 'GET') {

		return fetch(`${process.env.REACT_APP_BACKEND_URL}/${url}`);

	} else {

		const resp = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${url}`, {
			method,
			headers: {
		      'Content-Type':'application/json',
			},
			body: JSON.stringify(formData),
		});
		const data = await resp.json();

		return data;
	}
}

export const requestWithToken = async (url = "", token="", formData={}, method="GET") => {
	
	if (method === 'GET') {

		return await fetch(`${process.env.REACT_APP_BACKEND_URL}/${url}`, { headers: {'x-token': token} });

	} else {
		
		const resp = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${url}`, {
			method,
			headers: {
		      'x-token': token
			},
			body: formData,
		});
		const data = await resp.json();

		return data;
	}
}
export const requestWithoutToken = async (url = "", formData={}, method="GET") => {

	if (method === 'GET') {

		return fetch(`http://localhost:5000/${url}`);

	} else {

		const resp = await fetch(`http://localhost:5000/${url}`, {
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

		return await fetch(`http://localhost:5000/${url}`, { headers: {'x-token': token} });

	} else {
		
		const resp = await fetch(`http://localhost:5000/${url}`, {
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
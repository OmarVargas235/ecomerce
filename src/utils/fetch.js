export const requestWithoutToken = async (url = "", formData={}, method="GET") => {

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
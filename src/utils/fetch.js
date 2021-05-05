export const requestWithoutToken = async (url = "", formData={}, method="GET", query="") => {

	const newUrl = query ? (url + '/' + query) : url;

	const resp = await fetch(`http://localhost:5000/${newUrl}`, {
		method,
		headers: {
	      'Content-Type':'application/json',
		},
		body: JSON.stringify(formData),
	});
	const data = await resp.json();

	return data;
}
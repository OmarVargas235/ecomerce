import moment from 'moment';

export const classifyOrders = (orders) => {

	const arrMemory = [];
	let arr = [ orders[0] ];

	for (let i = 1; i < orders.length; i++) {

		const order = orders[i];
		const dateCurrent = moment(order.date).format('YYYY-MM-DD');
		const date = moment(arr[0]?.date).format('YYYY-MM-DD');
		const isSame = moment(dateCurrent).isSame(date);

		if (isSame) arr.push(order);
		else {

			arrMemory.push(arr);
			arr = [];
			arr.push(order);
		}
	}

	arrMemory.push(arr);
	return arrMemory;
}

export const isString = messages => typeof messages === 'string';
export const initialState = {
	countries: {},
	countriesMemo: {},
	regionsMemo: {},
	citys: [],
	codeCountry: '',
	latLng: [],
	idProduct: null,
};

export function reducer(state=initialState, { type, payload }) {

	switch (type) {

		case 'COUNTRIES':
			return {
				...state,
				countries: payload,
			}

		case 'COUNTRIES_MEMO':
			return {
				...state,
				countriesMemo: payload,
			}

		case 'REGIONS_MEMO':
			return {
				...state,
				regionsMemo: payload,
			}

		case 'CITYS':
			return {
				...state,
				citys: payload,
			}

		case 'CODE_COUNTRY':
			return {
				...state,
				codeCountry: payload,
			}

		case 'LATITUDE_LONGITUDE':
			return {
				...state,
				latLng: payload,
			}

		case 'ID_PRODUCT':
			return {
				...state,
				idProduct: payload,
			}

		default: return state;
	}
}
export const initialState = {
	messages: [],
	chats: [],
	chatsMemory: [],
	isBold: false,
	isCursive: false,
	isChangeRecordChat: false,
	search: '',
	isMounted: false,
}

export function reducer(state=initialState, {type, payload}) {

	switch(type) {

		case 'CHATS':
			return {
				...state,
				chats: payload,
			}

		case 'CHATS_MEMORY':
			return {
				...state,
				chatsMemory: payload,
			}

		case 'MESSAGES':
			return {
				...state,
				messages: payload,
			}

		case 'IS_BOLD':
			return {
				...state,
				isBold: payload,
			}

		case 'IS_CURSIVE':
			return {
				...state,
				isCursive: payload,
			}

		case 'CHANGE_CHAT':
			return {
				...state,
				isChangeRecordChat: payload,
			}

		case 'SEARCH':
			return {
				...state,
				search: payload,
			}

		case 'MOUNTED':
			return {
				...state,
				isMounted: payload,
			}

		default: return state;
	}
}
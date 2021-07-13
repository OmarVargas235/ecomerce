export const initialState = {
	messages: [],
	chatsMemory: [],
	isBold: false,
	isCursive: false,
	search: '',
	isMounted: false,
	isShowMessages: false,
	isChangeChat: false,
}

export function reducer(state=initialState, {type, payload}) {

	switch(type) {

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

		case 'SHOW_MESSAGE_RESPONSIVE':
		
			return {
				...state,
				isShowMessages: payload,
			}

		case 'IS_CHANGE_CHAT':
		
			return {
				...state,
				isChangeChat: payload,
			}

		default: return state;
	}
}
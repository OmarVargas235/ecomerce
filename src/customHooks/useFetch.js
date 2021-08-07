import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { alert } from '../utils/alert';
import { requestWithoutToken, requestWithToken } from '../utils/fetch';
import { logoutUser } from '../redux/actions/userAction';

export const useFetch = (url="", isToken=false) => {

	const { auth:{ token } } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const [data, setData] = useState({ data: null, loading: true });
	const [isMounted, setIsMounted] = useState( true );

	useEffect(() => {
		
		const id = url.split('/')[url.split('/').length - 1];
		
		if (id === 'undefined') return;
		
		async function callAPI() {

			const resp = isToken
			? await requestWithToken(url, token)
			: await requestWithoutToken(url);

			const { ok, messages, isExpiredToken } = await resp.json();

			// Si el token ya a expirado se deslogea
			if (isExpiredToken) {
				
				dispatch( logoutUser() );
				alert('error', messages);
				
				return;
			}

			if (!ok) return alert('error', messages);
			
			setData({ data: messages, loading: false });
		}
		
		isMounted && callAPI();

		return () => setIsMounted(false);

	}, [url, isToken, isMounted, token, dispatch]);

	return data;
}
import React from 'react';

import Notification from './Notification';
import MarkReadAndDelete from './MarkReadAndDelete';
import { NotificationsStyle } from '../style';

import Pagination from '@material-ui/lab/Pagination';
import { ThemeProvider } from '@material-ui/styles';

const NotificationsPage = ({ deleteAllNotifications, end, handleChangePage, initial, markAllRead, notifications, selectNotification, theme }) => (

	<NotificationsStyle className="container my-5">
		{
			notifications.length === 0
			? <p className="text-center mt-5">No tienes notificaciones</p>
			: notifications.slice(initial, end).map((notification, index) => (
				<Notification
					key={index}
					index={index}
					notification={notification}
					selectNotification={selectNotification}
				/>
			))
		}
		
		{
			notifications.length === 0 ? null
			: <MarkReadAndDelete
				deleteAllNotifications={deleteAllNotifications}
				markAllRead={markAllRead}
			/>
		}
		
		{
			notifications.length === 0 ? null
			: <ThemeProvider theme={theme}>
				<div className="mt-4 d-flex justify-content-center">
					<Pagination
						defaultPage={1}
						siblingCount={0}
						boundaryCount={1}
						count={Math.ceil(notifications.length / 10)}
						color="secondary"
						onChange={handleChangePage}
					/>
	    		</div>
			</ThemeProvider>
		}
	</NotificationsStyle>
)

export default NotificationsPage;
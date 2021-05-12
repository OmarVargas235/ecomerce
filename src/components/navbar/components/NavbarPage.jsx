import React from 'react';
import MenuMdPage from './MenuMdPage';
import DrawerPage from './DrawerPage';
import { NavbarContainer } from '../style';
import Search from '../container/Search';

const NavbarPage = ({ auth, activeSearch, classes, dataUser, history, isActiveLink, matches, setActiveSearch }) => (
	<NavbarContainer className="p-3">
		{
			matches 
				? <MenuMdPage
					auth={auth}
					classes={classes}
					dataUser={dataUser}
					history={history}
					isActiveLink={isActiveLink}
					setActiveSearch={setActiveSearch}
				/>
				: <DrawerPage
					auth={auth}
					dataUser={dataUser}
					history={history}
					isActiveLink={isActiveLink}
					setActiveSearch={setActiveSearch}
				/>
		}
		
		{ activeSearch ? <Search setActiveSearch={setActiveSearch} /> : null }
	</NavbarContainer>
)

export default NavbarPage;
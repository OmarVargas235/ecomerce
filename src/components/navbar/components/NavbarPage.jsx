import React from 'react';
import MenuMdPage from './MenuMdPage';
import DrawerPage from './DrawerPage';
import { NavbarContainer } from '../style';
import Search from '../container/Search';

import { ThemeProvider } from '@material-ui/styles';

const NavbarPage = ({ history, activeSearch, classes, isActiveLink, matches, setActiveSearch, theme }) => (
	<NavbarContainer className="p-3">
		<ThemeProvider theme={theme}>
			{
				matches 
					? <MenuMdPage
						history={history}
						classes={classes}
						isActiveLink={isActiveLink}
						setActiveSearch={setActiveSearch}
					/>
					: <DrawerPage
						history={history}
						isActiveLink={isActiveLink}
						setActiveSearch={setActiveSearch}
					/>
			}
			
			{ activeSearch ? <Search setActiveSearch={setActiveSearch} /> : null }
		</ThemeProvider>
	</NavbarContainer>
)

export default NavbarPage;
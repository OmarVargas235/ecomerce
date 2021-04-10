import React from 'react';
import MenuMdPage from './MenuMdPage';
import DrawerPage from './DrawerPage';
import { NavbarContainer } from '../style';
import Search from '../container/Search';

import { ThemeProvider } from '@material-ui/styles';

const NavbarPage = ({ history, activeSearch, classes, handleChange, isActiveLink, matches, setActiveSearch, theme, value }) => (
	<NavbarContainer className="p-3">
		<ThemeProvider theme={theme}>
			{
				matches 
					? <MenuMdPage
						history={history}
						classes={classes}
						handleChange={handleChange}
						isActiveLink={isActiveLink}
						setActiveSearch={setActiveSearch}
						value={value}
					/>
					: <DrawerPage 
						history={history}
						handleChange={handleChange}
						isActiveLink={isActiveLink}
						setActiveSearch={setActiveSearch}
						value={value}
					/>
			}
			
			{ activeSearch ? <Search setActiveSearch={setActiveSearch} /> : null }
		</ThemeProvider>
	</NavbarContainer>
)

export default NavbarPage;
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E12727',
    },
    secondary: {
      main: '#212121',
    },
  },
});

export const styleMaterialUiTheme = () => {
	
	return [
		theme,
	]
}
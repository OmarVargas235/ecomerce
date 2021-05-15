import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { Button, Checkbox } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';

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

// =====================================
// Boton y checkbox (colores)
// =====================================
export const TealButton = withStyles({
  root: {
    backgroundColor: teal[400],
    color: 'white',
    '&:hover': {
      backgroundColor: teal[600],
    }
  },
})(Button);

export const TealCheckbox = withStyles({
  root: {
    color: teal[300],
    '&$checked': {
      color: teal[500],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);
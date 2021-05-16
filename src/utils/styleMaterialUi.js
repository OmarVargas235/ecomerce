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

export const styleMaterialUiTheme = () => theme;

// =====================================
// Botones (colores)
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

export const RedButton = withStyles({
  root: {
    backgroundColor: '#E12727',
    '&:hover': {
      backgroundColor: '#212121',
    }
  },
})(Button);

export const RedLightButton = withStyles({
  root: {
    color: '#E12727',
    '&:hover': {
      backgroundColor: '#FEF6F6',
    }
  },
})(Button);

// =====================================
// Checkbox
// =====================================

export const TealCheckbox = withStyles({
  root: {
    color: teal[300],
    '&$checked': {
      color: teal[500],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);
import { withStyles,  makeStyles  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const styles={
    styleContainerDivAction:{
      background:"#24303c",
      padding: "5vh",
      width: "20vw",
      flexDirection:"column"
  },
  marginBottom:{marginBottom:"5%"}
} 
export const ButtonDashboard = withStyles({
  root: {
      background:"#1ab187",
      width: "100%",
      marginBottom:"5%"
  }
})(Button);

export const useStylesComplete = makeStyles({
  root: {
    background: 'white',
    width: "100%"
  }
});
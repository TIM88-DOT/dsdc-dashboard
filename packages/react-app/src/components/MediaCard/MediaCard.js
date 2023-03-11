import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from "../../assets/images/logo.png";
import mutantLogo from "../../assets/images/mutants-logo.png";
import classes from "./MediaCard.module.css"

export default function MediaCard(props) {
  const defaultClass = props.mutants ? "card--mutant" : "card"

  const CardMediaStyle = props.mutants ? {
    height: 190, backgroundSize: "55%"
  } : {
    height: 190, backgroundSize: "45%"
  }
  return (
    <Card className={classes[defaultClass]}>
      <CardMedia
        sx={CardMediaStyle}
        image={props.mutants ? mutantLogo : logo}
        title={props.mutants ? "DSDC Mutants Staking" : "DSDC Staking"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.mutants ? "Mutants Staking" : "DSDC Staking"}
        </Typography>
        {props.mutants ? <>
          <Typography variant="body2" color="text.secondary">
            ◘ 10x Higher APR
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ◘ 1 month lock
          </Typography></> :
          <>
            <Typography variant="body2" color="text.secondary">
              ◘ Lower APR
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ◘ Can unstake anytime
            </Typography>
          </>}
      </CardContent>
      <CardActions sx={{ justifyContent: "center", marginTop: "50px" }}>
        <Button size="medium">Select</Button>
      </CardActions>
    </Card>
  );
}
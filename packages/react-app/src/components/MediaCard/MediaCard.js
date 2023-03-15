import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from "../../assets/images/logo.png";
import mutantLogo from "../../assets/images/mutants-logo.png";
import { Link } from "react-router-dom";
import classes from "./MediaCard.module.css"

export default function MediaCard(props) {
  const defaultClass = props.mutants ? "card--mutant" : "card"
  const uri = props.mutants ? `dsdc-mutants` : `dsdc`
  const linkStyle = {
    margin: " 0",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: "1.5",
    display: "block",
    color: "#fff",
    textDecoration: "none"
  }
  const CardMediaStyle = props.mutants ? {
    height: 190, backgroundSize: "55%"
  } : {
    height: 190, backgroundSize: "45%"
  }
  return (
    <Card sx={{ backgroundImage: "none" }} className={classes[defaultClass]}>
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
        <Link style={linkStyle} to={uri}>
          <Button size="medium">Select</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
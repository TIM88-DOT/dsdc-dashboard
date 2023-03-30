import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from "../../assets/images/logo.jpg";
import mutantLogo from "../../assets/images/mutants-logo.png";
import { Link } from "react-router-dom";
import classes from "./MediaCard.module.css"
import { ButtonPrimary } from '..';

export default function MediaCard(props) {
  const defaultClass = props.mutants ? "card--mutant" : "card"
  const uri = props.mutants ? `dsdc-mutants` : `dsdc`
  const linkStyle = {
    margin: "0",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: "1.5",
    display: "block",
    color: "#fff",
    textDecoration: "none"
  }
  const CardMediaStyle = props.mutants ? {
    height: 190, backgroundSize: "50%"
  } : {
    height: 190, backgroundSize: "50%"
  }
  return (
    <Card sx={{ backgroundImage: "none", border: "1px solid #bfc500", backgroundColor: "transparent" }} className={classes[defaultClass]}>
      <CardMedia
        sx={CardMediaStyle}
        image={props.mutants ? mutantLogo : logo}
        title={props.mutants ? "DSDC Mutants Staking" : "DSDC Staking"}
      />
      <CardContent sx={{ textAlign: "center", padding: "14px" }}>
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
              ◘ Can unstake anytime
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ◘ Lower APR
            </Typography>
          </>}
      </CardContent>
      <CardActions sx={{ justifyContent: "center", marginTop: "50px", marginBottom: "20px" }}>
        <Link style={linkStyle} to={uri}>
          <ButtonPrimary>Select</ButtonPrimary>
        </Link>
      </CardActions>
    </Card>
  );
}
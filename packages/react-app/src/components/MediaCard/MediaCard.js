import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ogLogo from "../../assets/images/logo.jpg";
import mutantLogo from "../../assets/images/mutants-logo.png";
import stonersLogo from "../../assets/images/stoned.png";
import { Link } from "react-router-dom";
import classes from "./MediaCard.module.css"
import { ButtonPrimary } from '..';

export default function MediaCard(props) {
  let defaultClass;
  let uri;
  let logo;
  let title; 
  let descriptionOne;
  switch (props.plan) {
    case 0:
      defaultClass = "card";
      uri = "dsdc";
      logo = ogLogo;
      title = "DSDC Staking";
      descriptionOne = "lower APR"
      break;
    case 1:
      defaultClass = "card--mutant";
      uri = "dsdc-mutants"
      logo = mutantLogo;
      title = "Mutants Staking";
      descriptionOne = "Higher APR"
      break;
    case 2:
      uri = "ssss"
      logo = stonersLogo;
      title = "SSSS Staking";
      defaultClass = "card";
      descriptionOne = "Higher APR"
      break;
    default:
      defaultClass = "card"
      break;
  }
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
  const CardMediaStyle = {
    height: 190,
    backgroundSize: "50%"
  }

  return (
    <Card sx={{ backgroundImage: "none", border: "1px solid #bfc500", backgroundColor: "transparent" }} className={classes[defaultClass]}>
      <CardMedia
        sx={CardMediaStyle}
        image={logo}
        title={title}
      />
      <CardContent sx={{ textAlign: "center", padding: "14px" }}>
        <Typography sx={{ whiteSpace: "nowrap" }} gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {props.mutants ? <>
          <Typography variant="body2" color="text.secondary">
            {descriptionOne}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No Lock
          </Typography></> :
          <>
            <Typography variant="body2" color="text.secondary">
            {descriptionOne}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            No Lock
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
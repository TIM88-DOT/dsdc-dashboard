import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from "../../assets/images/logo.png";
import mutantLogo from "../../assets/images/mutants-logo.png";

export default function MediaCard(props) {
  const style = props.mutants ? {
    maxWidth: 245,
    marginLeft: 15
  } :
    {
      maxWidth: 245
    };
  return (
    <Card sx={style}>
      <CardMedia
        sx={{ height: 140, backgroundSize: "contain" }}
        image={props.mutants ? mutantLogo : logo}
        title={props.mutants ? "DSDC Mutants Staking" : "DSDC Staking"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.mutants ? "Mutants Staking" : "DSDC Staking"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button size="small">Select</Button>
      </CardActions>
    </Card>
  );
}
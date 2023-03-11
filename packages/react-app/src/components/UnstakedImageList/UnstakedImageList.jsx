import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useMediaQuery } from "@mui/material";
import classes from "./UnstakedImageList.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export const UnstakedImageList = (props) => {
  const mobile = useMediaQuery("(max-width:500px)");
  const clickHandler = (event, e) => {
    if (props.selectedStakeNFT.includes(e)) {
      props.setSelectedStakeNFT(props.selectedStakeNFT.filter((item) => item !== e));
    } else {
      props.setSelectedStakeNFT([...props.selectedStakeNFT, e]);
    }
    event.preventDefault();
    console.log(e);
  };

  return (
    <>
      {props.loading ? (
        <div className={classes.loading}>
          <Typography sx={{ marginBottom: "35px" }} variant="h6" component="h4">
            Fetching your available mutants...
          </Typography>
          <CircularProgress color="warning"/>
        </div>
      ) : (
        <ImageList
          sx={{
            width: "auto",
            height: 450,
            padding: "25px",
          }}
          cols={mobile ? 1 : 4}
        >
          {props.itemData?.map((item, key) => (
            <div  className={
              props.selectedStakeNFT?.includes(item.tokenId) ? classes.active : ""
            } key={key}>
              <ImageListItem
                id={item.tokenId}
                onClick={(event) => clickHandler(event, item.tokenId)}
              >
                <div className={classes.image_card}>
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <ImageListItemBar title={item.title} position="below" />
                </div>
              </ImageListItem>
            </div>
          ))}
        </ImageList>
      )}
    </>
  );
};

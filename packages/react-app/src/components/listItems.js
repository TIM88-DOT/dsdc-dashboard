import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import MenuIcon from '@mui/icons-material/Menu';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PublicIcon from '@mui/icons-material/Public';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from "react-router-dom";

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
export const mainListItems = (

  <React.Fragment>

    <Link style={linkStyle} to={`/`}>
      <ListItemButton>
        <ListItemIcon>
          <SwapVertIcon />
        </ListItemIcon>
        Swap
      </ListItemButton>
    </Link>

    <Link style={linkStyle} to={`stake`}>
      <ListItemButton>
        <ListItemIcon>
          <RocketLaunchIcon />
        </ListItemIcon>
        NFT Staking
      </ListItemButton>
    </Link>

    <ListItemButton>
      <ListItemIcon>
        <MonetizationOnIcon />
      </ListItemIcon>
      <ListItemText primary="Token Staking" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <AgricultureIcon />
      </ListItemIcon>
      <ListItemText primary="LP Farming" />
    </ListItemButton>

  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader sx={{backgroundColor: "#020202"}} component="div" inset>
      Socials
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <TelegramIcon />
      </ListItemIcon>
      <ListItemText primary="Telegram" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <TwitterIcon />
      </ListItemIcon>
      <ListItemText primary="Twitter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PublicIcon />
      </ListItemIcon>
      <ListItemText primary="Website" />
    </ListItemButton>
  </React.Fragment>
);

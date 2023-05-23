import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PublicIcon from '@mui/icons-material/Public';
import DescriptionIcon from '@mui/icons-material/Description';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from "react-router-dom";

const linkStyle = {
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
        <ListItemText primary="SWAP" />
      </ListItemButton>
    </Link>

    <Link style={linkStyle} to={`stake`}>
      <ListItemButton>
        <ListItemIcon>
          <RocketLaunchIcon />
        </ListItemIcon>
        <ListItemText primary="NFT STAKING" />
      </ListItemButton>
    </Link>

    <ListItemButton>
      <ListItemIcon>
        <MonetizationOnIcon />
      </ListItemIcon>
      <ListItemText primary="TOKEN STAKING" />
    </ListItemButton>

    <Link style={linkStyle} to={`chart`}>
      <ListItemButton>
        <ListItemIcon>
          <ShowChartIcon />
        </ListItemIcon>
        <ListItemText primary="CHART" />
      </ListItemButton>
    </Link>

  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader sx={{ backgroundColor: "#020202" }} component="div" inset>
      SOCIALS
    </ListSubheader>
    <a style={linkStyle} href="https://t.me/DrunkSkunksDCOfficial" target="_blank" rel="noopener noreferrer">
      <ListItemButton>
        <ListItemIcon>
          <TelegramIcon />
        </ListItemIcon>
        <ListItemText primary="TELEGRAM" />
      </ListItemButton>
    </a>
    <a style={linkStyle} href="https://twitter.com/DrunkSkunksDC" target="_blank" rel="noopener noreferrer">
      <ListItemButton>
        <ListItemIcon>
          <TwitterIcon />
        </ListItemIcon>
        <ListItemText primary="TWITTER" />
      </ListItemButton>
    </a>
    <a style={linkStyle} href="https://drunkskunksdc.com/" target="_blank" rel="noopener noreferrer">
      <ListItemButton>
        <ListItemIcon>
          <PublicIcon />
        </ListItemIcon>
        <ListItemText primary="WEBSITE" />
      </ListItemButton>
    </a>
    <a style={linkStyle} href="https://docs.drunkskunksdc.com/" target="_blank" rel="noopener noreferrer">
      <ListItemButton>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="DOCS" />
      </ListItemButton>
    </a>
  </React.Fragment>
);

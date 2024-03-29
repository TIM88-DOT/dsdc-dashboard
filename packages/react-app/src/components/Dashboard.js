import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import logo from "../logo.png";
import { mainListItems, secondaryListItems } from './listItems';
import { grey } from '@mui/material/colors';
import { Route, Routes } from 'react-router-dom';
import NftStaking from './NftStaking/NftStaking';
import StakedNfts from './StakedNfts/StakedNfts';
import WalletButton from './WalletButton';
import TotalRewards from './TotalRewards/TotalRewards';
import DefaultSwap from './DefaultSwap';
import Chart from './Chart/Chart';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      height: '100vh',
      width: drawerWidth,
      backgroundColor: "#020202",
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const theme = createTheme({

});

const mdTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bfc500',
    },
    divider: '#bfc500',
    text: {
      primary: '#fff',
      secondary: grey[500],
    },

  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 12, // Set the font size to 10
  },
  
  components: {
    // Name of the component
    ListItemIcon: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          padding: '8px 4px',
        },
      },
    },
  },
  spacing: (factor) => `${0.25 * factor}rem`,
});

mdTheme.spacing(2);

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              backgroundColor: "#020202",
              borderBottom: "1px solid #bfc500",
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <WalletButton />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              backgroundColor: (theme) => "#020202"
            }}
          >
            <img style={{
              width: "9em",
              margin: "auto"
            }} src={logo} />
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => "#020202",
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }}>
            <Grid container
              justifyContent="center"
              alignItems="center" item xs={12}>
              <Routes>
                <Route path="/" element={<DefaultSwap />} />
                <Route path="chart" element={<Chart />} />
                <Route path="stake" element={<NftStaking />} />
                <Route path="stake/dsdc" element={
                  <>
                    <Grid container
                      direction="column"
                      justifyContent="center"
                      alignItems="center">
                      <StakedNfts plan={0} />
                      <TotalRewards plan={0} />
                    </Grid>
                  </>} />
                <Route path="stake/dsdc-mutants" element={
                  <>
                    <Grid container
                      direction="column"
                      justifyContent="center"
                      alignItems="center">
                      <StakedNfts plan={1} />
                      <TotalRewards plan={1} />
                    </Grid>
                  </>} />
                <Route path="stake/ssss" element={
                  <>
                    <Grid container
                      direction="column"
                      justifyContent="center"
                      alignItems="center">
                      <StakedNfts plan={2} />
                      <TotalRewards plan={2} />
                    </Grid>
                  </>} />
              </Routes>
            </Grid>
          </Container>

        </Box>
      </Box>


    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

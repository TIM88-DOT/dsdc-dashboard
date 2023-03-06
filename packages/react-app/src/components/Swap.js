import React from 'react';
import Paper from '@mui/material/Paper';
const Swap = () => {
  return (
    <Paper sx={{
      p: 1,
      display: 'flex',
      flexDirection: 'column',
      height: 600,
    }}>

    <iframe width="400" height="590" frameborder="0" allow="clipboard-read *; clipboard-write *; web-share *; accelerometer *; autoplay *; camera *; gyroscope *; payment *; geolocation *" src="https://flooz.trade/embed/trade?swapDisabled=false&swapToTokenAddress=0xdc42c3a92c4A03F9b9F3FBaBa0125286FDAa6772&swapLockToToken=true&onRampDisabled=true&onRampAsDefault=false&onRampDefaultAmount=200&network=bsc&lightMode=false&primaryColor=%23bfc500&roundedCorners=0&padding=32" ></iframe>

    </Paper>
  );
};

export default Swap;

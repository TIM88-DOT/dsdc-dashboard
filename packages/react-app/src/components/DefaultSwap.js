import React from 'react';

const DefaultSwap = () => {

    return (
        <div style={{marginBlock:'40px'}}>
            <iframe width="400" height="590" frameborder="0" allow="clipboard-read *; clipboard-write *; web-share *; accelerometer *; autoplay *; camera *; gyroscope *; payment *; geolocation *" src="https://flooz.trade/embed/trade?swapDisabled=false&swapToTokenAddress=0x4E2970252B0b294cD041004093e9bA39e5286504&swapLockToToken=true&onRampDisabled=true&onRampAsDefault=false&onRampDefaultAmount=200&network=bsc&lightMode=false&primaryColor=%23bfc500&roundedCorners=10&padding=20" ></iframe>
        </div>
    );
};

export default DefaultSwap;
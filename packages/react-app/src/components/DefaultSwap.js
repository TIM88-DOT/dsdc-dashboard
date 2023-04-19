import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const DefaultSwap = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const iframeRef = useRef(null);
    const mobile = useMediaQuery("(max-width:500px)");
    const handleLoad = () => {
        setIsLoaded(true);
    };

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.addEventListener("load", handleLoad);
            return () => iframe.removeEventListener("load", handleLoad);
        }
    }, []);

    return (
        <div style={{ marginBlock: '100px' }}>
            {!isLoaded && <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <Typography sx={{
                    marginBottom: "35px"
                }} variant="h6" component="h4">
                    Loading Swap...
                </Typography>
                <CircularProgress color="warning" />
            </div>}

            <iframe
                style={{ display: isLoaded ? "block" : "none" }}
                ref={iframeRef}
                width={mobile ? "420" : "500"}
                height="805"
                frameborder="0"
                allow="clipboard-read *; clipboard-write *; web-share *; accelerometer *; autoplay *; camera *; gyroscope *; payment *; geolocation *"
                src="https://flooz.trade/embed/trade?swapDisabled=false&swapToTokenAddress=0x4E2970252B0b294cD041004093e9bA39e5286504&swapLockToToken=true&onRampDisabled=true&onRampAsDefault=false&onRampDefaultAmount=200&network=bsc&lightMode=false&primaryColor=%23bfc500&roundedCorners=10&padding=20" >

            </iframe>
        </div>
    );
};

export default DefaultSwap;
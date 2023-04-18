import React, { useState, useEffect, useRef } from "react";
import classes from "./Chart.module.css";
import { useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const Chart = () => {

    return (
        <div style={{ marginBlock: '40px' }}>
            <div id={classes["dexscreener-embed"]}>
                <iframe src="https://dexscreener.com/bsc/0xA8beEbeeF1bE5265D7eFa64857F1c5C59F53dC98?embed=1&theme=dark&trades=0"></iframe></div>
        </div>
    );
};

export default Chart;
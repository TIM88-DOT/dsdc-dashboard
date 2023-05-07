import * as React from 'react';
import MediaCard from '../MediaCard/MediaCard';
import classes from "./NftStaking.module.css";

function NftStaking() {
    return (
        <>
            <div className={classes.header}>
                <h2>Stake your Skunk(s) to earn $STINKY</h2>
            </div>
            <div className={classes.container}>
                <MediaCard plan={0} />
                <MediaCard plan={1} />
                <MediaCard plan={2} />
            </div>
        </>
    );
}


export default NftStaking;

import * as React from 'react';
import MediaCard from '../MediaCard/MediaCard';
import classes from "./NftStaking.module.css";

function NftStaking(props) {
    return (
        <div className={classes.container}>
            <>
            <MediaCard />
            <MediaCard mutants={true} />
            </>
        </div>
    );
}


export default NftStaking;

import React from "react";
import LinearProgress from '@mui/material/LinearProgress';

export default function Loading(){
    return (
        <div className="centered-message">
            <div className="message">
                <LinearProgress />
                <h5>Loading...</h5>
            </div>
        </div>
    )
}
import { Typography, Box } from "@mui/material";
import { useState } from "react";
import clsx from "clsx";

export default function Progress({ value, max, label }){
    const [overbudget, setOverbudget] = useState(value > max);
    const [width, setWidth] = useState(value / max > 1 ? 1 : value / max);
    
    return (
        <div>
            <Typography variant="h6">{label}</Typography>
            <div className={clsx({progress: true}, {over: overbudget})}>
                <Box className="bar" width={width}>
                    <label>${value} / ${max}</label>
                </Box>
            </div>
        </div>
    )
}
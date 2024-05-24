import React from "react";
import { Typography } from "@mui/material";

export default function Purchase({ purchase }) {
    return (
        <div>
            <Typography variant="h6">${purchase.Amount} @ {purchase.Store.Name}</Typography>
        </div>
    )
}
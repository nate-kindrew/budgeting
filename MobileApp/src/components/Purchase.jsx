import React from "react";
import { Typography } from "@mui/material";
import dayjs from "dayjs";

export default function Purchase({ purchase, onClick }) {
    return (
        <div  onClick={() => onClick(purchase)}>
            <Typography variant="h6" gutterBottom>${purchase.Amount} @ {purchase.Store.Name}</Typography>
            <Typography variant="caption">{dayjs(purchase.CreatedDate).format("MM/DD/YYYY")}</Typography>
            <hr />
        </div>
    )
}
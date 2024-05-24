import React from "react";
import { Card, CardContent, CardHeader, CardActions, Button } from "@mui/material";

export default function Setup(){

    return (
        <div>
            <h2>Setup</h2>
            <Card>
                <CardHeader title="Categories" />
                <CardContent>
                    Budgeting categories into which purchases and expenses can be grouped.
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" onClick={() => window.location = '/setup/categories'}>Edit</Button>
                </CardActions>
            </Card>
            <Card>
                <CardHeader title="Stores" />
                <CardContent>
                    Configured list of stores and their default category into which purchases would be organized.
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" onClick={() => window.location = '/setup/stores'}>Edit</Button>
                </CardActions>
            </Card>
            <Card>
                <CardHeader title="Budgeting Periods" />
                <CardContent>
                    Timeframes into which purhcases are organized.
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" onClick={() => window.location = '/setup/budgetingperiods'}>Edit</Button>
                </CardActions>
            </Card>
        </div>
    );
}
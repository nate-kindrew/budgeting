import React, { useState, useEffect } from "react";
import { Divider, TextField, Card, CardHeader, CardContent, CardActions, Container, Fab, IconButton } from "@mui/material";
import { useGetStores } from "../APIs";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../components/Header";
import Loading from "../components/Loading";

export default function Stores(){
    const { data, isLoading } = useGetStores()

    if(isLoading){
        return (
            <Loading />
        )
    }

    return (
        <div>
            <Header>Stores</Header>
            {data.map(item => <Store store={item} />)}
            <Fab 
                color="primary"
                size="large"
                className="bottom-action" 
                href="/setup/stores/new">
                    <AddIcon />
            </Fab>
        </div>
    )
}

const Store = ({ store }) => {
    return (
        <Card>
            <CardHeader 
                title={store.Name}
                action={
                    <IconButton
                        color="primary"
                        href={'/setup/stores/' + store.StoreId}
                    >
                        <EditIcon />
                    </IconButton>
                } 
            />
        </Card>
    );
}
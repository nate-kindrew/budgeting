import React, { useState } from "react";
import { useGetCategories, useGetStore, useMutateStore } from "../APIs";
import { Divider, IconButton, TextField, Card, CardHeader, CardContent, CardActions, MenuItem } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Header from "../components/Header";

export default function EditStore () {
    let urlParams = useParams();
    const storeId = urlParams["id"];
    const query = useGetStore(storeId);
    

    if(query.isLoading){
        return (
            <Loading />
        )
    }
    else {
        return (
            <>
                <Header>Edit Store</Header>
                <Editor store={query.data} />
            </>
        )
    }
}

const Editor = ({ store }) => {
    const [storeName, setStoreName] = useState(store.Name ? store.Name : "");
    const [defaultCategory, setDefaultCategory] = useState(store.DefaultCategory ? store.DefaultCategory.BudgetingCategoryId : 0);
    const mutateStore = useMutateStore();
    const { data: categories, isLoading } = useGetCategories();
    
    const save = () => {
        mutateStore.mutate({ StoreId: store.StoreId ? store.StoreId : 0, Name: storeName, DefaultCategory: categories.find(c => c.BudgetingCategoryId == defaultCategory) },
            {
                onSuccess: () => {
                    window.location = "/setup/stores";
                },
                onError: error => {
                    alert(error);
                }
            });
    }

    if(isLoading){
        return (<Loading />);
    }

    return (
        <Card>
            <CardHeader>{store.StoreId ? "Editing Store: " + store.Name : "New Store"}</CardHeader>
            <CardContent>
                <TextField value={storeName} onChange={event => {
                    setStoreName(event.target.value)
                }} label="Store Name" />
                <Divider />
                <TextField 
                    value={defaultCategory} 
                    onChange={event => {
                        setDefaultCategory(event.target.value)
                    }} 
                    label="Default Category"
                    select
                >
                    {categories.map(item => (
                        <MenuItem key={item.BudgetingCategoryId} value={item.BudgetingCategoryId} selected={item.BudgetingCategoryId == defaultCategory}>
                            {item.Name}
                        </MenuItem>
                    ))}
                </TextField>
            </CardContent>
            <CardActions>
                <IconButton
                    color="default"
                    href="/setup/stores">
                        <CancelIcon />
                </IconButton>
                <IconButton
                    color="success"
                    onClick={save}>
                        <SaveIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
import React, { useState, useEffect } from "react";
import { Divider, IconButton, TextField, Card, CardHeader, CardContent, Fab } from "@mui/material";
import { useGetCategories } from "../APIs";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../components/Header";
import Loading from "../components/Loading";

export default function Categories(){
    const { data, isLoading } = useGetCategories();
    

    if(isLoading){
        return (
            <Loading />
        )
    }
    return (
        <div>
            <Header>Categories</Header>
            {data.map(item => <Category category={item} />)}
            <Fab 
                color="primary"
                size="large"
                className="bottom-action" 
                href="/setup/categories/new">
                    <AddIcon />
            </Fab>
        </div>
    )
}

const Category = ({ category }) => {
    
    return (
        <Card>
            <CardHeader 
                title={category.Name}
                action={
                    <IconButton
                        color="primary"
                        href={'/setup/categories/' + category.BudgetingCategoryId}
                    >
                        <EditIcon />
                    </IconButton>
                } />
            <CardContent>{category.Amount}</CardContent>
        </Card>
    );
}
import React, { useState } from "react";
import { useGetCategory, useMutateCategory } from "../APIs";
import { Divider, IconButton, TextField, Card, CardContent, CardActions, Checkbox, FormControlLabel } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { DatePicker } from "@mui/x-date-pickers";

export default function EditCategory () {
    let urlParams = useParams();
    const budgetingCategoryId = urlParams["id"];
    const query = useGetCategory(budgetingCategoryId);
    

    if(query.isLoading){
        return (
            <Loading />
        )
    }
    else {
        return (
            <>
                <Header>{budgetingCategoryId ? "Editing Category" : "New Category"}</Header>
                <Editor category={query.data} />
            </>
        )
    }
}

const Editor = ({ category }) => {
    const [categoryName, setCategoryName] = useState(category.Name);
    const [categoryAmount, setCategoryAmount] = useState(category.Amount);
    const [recurring, setRecurring] = useState(category.Recurring);
    const [recurrenceDate, setRecurrenceDate] = useState(category.RecurrenceDate);

    const mutateCategory = useMutateCategory();
    
    const save = () => {
        mutateCategory.mutate({ BudgetingCategoryId: category.BudgetingCategoryId ? category.BudgetingCategoryId : 0, Name: categoryName, Amount: categoryAmount, IsRecurring: recurring == "on", RecurrenceDate: recurrenceDate?.toDate() },
            {
                onSuccess: () => {
                    window.location = "/setup/categories";
                },
                onError: error => {
                    alert(error);
                }
            });
    }

    return (
        <Card>
            <CardContent>
                <TextField value={categoryName} onChange={event => {
                    setCategoryName(event.target.value)
                }} label="Category" />
                <Divider />
                <TextField value={categoryAmount} onChange={event => {
                    setCategoryAmount(event.target.value)
                }} label="Amount" />
                <Divider />
                <FormControlLabel control={<Checkbox />} label="Recurring?" value={recurring} onChange={evt => setRecurring(evt.target.value)} />
                <Divider />
                <DatePicker value={recurrenceDate} onChange={val => setRecurrenceDate(val)} label="Recurrence Date" />
            </CardContent>
            <CardActions>
                <IconButton
                    color="default"
                    href="/setup/categories">
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
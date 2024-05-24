import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Divider, IconButton, TextField, Card, CardContent, CardActions } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { useMutateBudgetingPeriod, useGetBudgetingPeriod } from "../APIs";
import dayjs from 'dayjs';

export default function EditBudgetingPeriod () {
    let urlParams = useParams();
    const periodId = urlParams["id"];
    const query = useGetBudgetingPeriod(periodId);

    if(query.isLoading){
        return (
            <Loading />
        )
    }
    else {
        return (
            <>
                <Header>{periodId ? "Editing Budgeting Period" : "New Budgeting Period"}</Header>
                <Editor budgetingPeriod={query.data} />
            </>
        )
    }
}

const Editor = ({ budgetingPeriod }) => {
    const [startDate, setStartDate] = useState(dayjs(budgetingPeriod.StartDate));
    const [endDate, setEndDate] = useState(dayjs(budgetingPeriod.EndDate));

    const mutateBudgetingPeriod = useMutateBudgetingPeriod();

    const save = () => {
        mutateBudgetingPeriod.mutate({ BudgetingPeriodId: budgetingPeriod.BudgetingPeriodId ? budgetingPeriod.BudgetingPeriodId : 0, StartDate: startDate.toDate(), EndDate: endDate.toDate()}, 
            {
                onSuccess: () => {
                    window.location = "/setup/budgetingperiods";
                },
                onError: error => {
                    alert(error);
                }
            }
        );
    }

    return (
        <Card>
            <CardContent>
                <DatePicker value={startDate} onChange={val => { setStartDate(val) }} label="Start Date" />
                <Divider />
                <DatePicker value={endDate} onChange={val => { setEndDate(val) }} label="End Date" />
            </CardContent>
            <CardActions>
                <IconButton
                    color="default"
                    href="/setup/budgetingperiods">
                        <CancelIcon />
                </IconButton>
                <IconButton
                    color="success"
                    onClick={save}>
                        <SaveIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}
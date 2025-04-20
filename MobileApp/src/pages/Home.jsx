import React from "react";
import Loading from "../components/Loading";
import { Typography } from "@mui/material";
import { useGetCategoriesGroupedInPeriod, useCurrentBudgetingPeriod, useGetRecurringCategoriesPaid } from "../APIs";
import Progress from "../components/Progress";
import Header from "../components/Header";
import dayjs from "dayjs";

export default function Home(){
    const { data: groups, isLoading: groupsLoading } = useGetCategoriesGroupedInPeriod();
    const { data: period, isLoading: periodLoading } = useCurrentBudgetingPeriod();
    const { data: categoriesPaid, isLoading: categoriesPaidLoading } = useGetRecurringCategoriesPaid();

    if(groupsLoading || periodLoading || categoriesPaidLoading){
        return <Loading />
    }
    console.log(categoriesPaid);

    return (
        <div>
            <Header>Dashboard</Header>
            <Typography variant="h4">Perod ends {dayjs(period.EndDate).format("MM/DD")}</Typography>
            <Typography variant="h5">Variable Items</Typography>
            {groups.map(category => <Progress value={category.TotalAmount} max={category.BudgetedAmount} label={category.BudgetName} />)}
            <hr />
            <Typography variant="h5">Recurring Items</Typography>
            {categoriesPaid.map(category => <Progress value={category.Amount} max={category.Amount} label={category.Name} />)}
        </div>
    )
}
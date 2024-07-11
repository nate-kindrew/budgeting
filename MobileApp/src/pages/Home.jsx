import React from "react";
import Loading from "../components/Loading";
import { Typography } from "@mui/material";
import { useGetCategoriesGroupedInPeriod, useCurrentBudgetingPeriod } from "../APIs";
import Progress from "../components/Progress";
import Header from "../components/Header";
import dayjs from "dayjs";

export default function Home(){
    const { data: groups, isLoading: groupsLoading } = useGetCategoriesGroupedInPeriod();
    const { data: period, isLoading: periodLoading } = useCurrentBudgetingPeriod();

    if(groupsLoading || periodLoading){
        return <Loading />
    }

    return (
        <div>
            <Header>Dashboard</Header>
            <Typography variant="h4">Perod ends {dayjs(period.EndDate).format("MM/DD")}</Typography>
            {groups.map(category => <Progress value={category.TotalAmount} max={category.BudgetedAmount} label={category.BudgetName} />)}
        </div>
    )
}
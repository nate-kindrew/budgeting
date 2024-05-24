import { Card, CardContent, CardHeader, Fab, IconButton } from "@mui/material";
import { useGetBudgetingPeriods } from "../APIs";
import Header from "../components/Header";
import Loading from "../components/Loading";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from 'dayjs';

export default function BudgetingPeriods() {
    const { data, isLoading } = useGetBudgetingPeriods();

    if(isLoading){
        return <Loading />;
    }

    return (
        <>
            <Header>Budgeting Periods</Header>
            {data.map(item => <BudgetingPeriod budgetingPeriod={item} />)}
            <Fab
                color="primary"
                size="large"
                className="bottom-action"
                href="/setup/budgetingperiods/new">
                    <AddIcon />
            </Fab>
        </>
    )
}

const BudgetingPeriod = ({ budgetingPeriod }) => {
    return (
        <Card>
            <CardHeader
                title={`${dayjs(budgetingPeriod.StartDate).format("MM/DD/YYYY")} to ${dayjs(budgetingPeriod.EndDate).format("MM/DD/YYYY")}`}
                action={
                    <IconButton
                        color="primary"
                        href={'/setup/budgetingperiods/' + budgetingPeriod.BudgetingPeriodId}
                    >
                        <EditIcon />
                    </IconButton>
                }
            />
        </Card>
    )
}
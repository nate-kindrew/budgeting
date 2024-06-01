import Header from "../components/Header";
import { useGetCategories, useGetStores, useCurrentBudgetingPeriod, useMutatePurchase, useGetPurchases } from "../APIs";
import Loading from "../components/Loading";
import { Divider, Button, MenuItem, TextField, Card, CardContent, CardActions, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import Purchase from "../components/Purchase";
import Save from "@mui/icons-material/Save";

export default function Entry() {
    const { data: stores, isLoading: storesLoading } = useGetStores();
    const { data: categories, isLoading: categoriesLoading } = useGetCategories();
    // const { data: currentPeriod, isLoading: currentPeriodLoading } = useCurrentBudgetingPeriod();
    
    const { data: purchases, isLoading: purchasesLoading } = useGetPurchases();
    const [store, setStore] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [purchaseId, setPurchaseId] = useState(0);
    
    const mutatePurchase = useMutatePurchase();
    
    const submit = () => {
        // console.log({ 
        //     Amount: amount,
        //     Store: stores.find(s => s.StoreId == store),
        //     Budget: categories.find(c => c.BudgetingCategoryId == category)
        // })
        mutatePurchase.mutate({
            PurchaseId: purchaseId, 
            Amount: amount,
            Store: stores.find(s => s.StoreId == store),
            Budget: categories.find(c => c.BudgetingCategoryId == category),
            Note: note
        }, {
            onSuccess: () => {
                reset();
            }
        })
    }

    const reset = () => {
        setStore("");
        setCategory("");
        setAmount("");
        setNote("");
    }

    const onSelect = (purchase) => {
        setPurchaseId(purchase.PurchaseId);
        setStore(purchase.Store.StoreId);
        setCategory(purchase.Budget.BudgetingCategoryId);
        setAmount(purchase.Amount);
        setNote(purchase.Note);
    }

    if(storesLoading || categoriesLoading || purchasesLoading){
        return (
            <Loading />
        );
    }

    return (
        <>
            <Header>Entry</Header>
            <Card>
                <CardContent>
                    <TextField
                        select
                        onChange={evt => {
                            setStore(evt.target.value);
                            var store = stores.find(s => s.StoreId == evt.target.value);
                            setCategory(store.DefaultCategory.BudgetingCategoryId);
                        }}
                        value={store}
                        label="Store"
                    >
                        {stores.map(s => (
                            <MenuItem
                                value={s.StoreId}
                                key={s.StoreId}
                            >
                                {s.Name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Divider />
                    <TextField
                        select
                        onChange={evt => setCategory(evt.target.value)}
                        value={category}
                        label="Category"
                    >
                        {categories.map(c => (
                            <MenuItem
                                value={c.BudgetingCategoryId}
                                key={c.BudgetingCategoryId}
                            >
                                {c.Name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Divider />
                    <TextField
                        onChange={evt => setAmount(evt.target.value)}
                        value={amount}
                        label="Amount"
                    />
                    <Divider />
                    <TextField
                        onChange={evt => setNote(evt.target.value)}
                        value={note}
                        label="Note"
                    />
                </CardContent>
                <CardActions>
                    <IconButton
                        color="default"
                        onClick={reset}
                    >
                            <CancelIcon />
                    </IconButton>
                    <Button
                        color="success"
                        onClick={submit}
                    >
                        <SaveIcon />
                    </Button>
                </CardActions>
            </Card>
            <Card>
                <CardContent>
                    {purchases.map((purchase, idx) => 
                        <Purchase purchase={purchase} onClick={onSelect} key={idx} />
                    )}
                </CardContent>
            </Card>
        </>
    )
}
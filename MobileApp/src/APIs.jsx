import { 
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

const basePath = "http://localhost:5051/api/"

const Get = async (path, params) => {
    var querystring = params ? new URLSearchParams(params).toString() : "";
    const response = await fetch(basePath + path + (querystring ? "?" + querystring : ""), {
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json();
}

const Put = (path, params) => {
    return fetch(basePath + path, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
}

const Post = (path, params) => {
    return fetch(basePath + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
}

const Delete = (path, params) => {
    return fetch(basePath + path, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
}

/* ----------------------------------------------------------------------------- */

const GetBudgetSummary = (budgetID) => {
    return Get("Budgets/Summary", { budgetID })
}

export const GetCategories = () => {
    return Get("Categories/List");
}

export const GetCategory = (budgetingCategoryId) => {
    if(budgetingCategoryId == "new"){
        return new Promise((resolve) => {
            resolve({
                BudgetingCategoryId: null,
                Name: null,
                Amount: null,
                Recurring: false,
                RecurrenceDate: null
            })
        })
    } else {
        return Get("Categories", { budgetingCategoryId })
    }
}

const UpdateCategory = (category) => {
    return Post("Categories", category);
}

const DeleteCategory = (categoryID) => {
    return Delete("Categories", {categoryID});
}

const GetStores = () => {
    return Get("Stores/List");
}

export const GetStore = (storeId) => {
    if(storeId == "new"){
        return new Promise((resolve) => {
            resolve({
                StoreId: null,
                Name: null,
                DefaultCategory: null
            })
        })
    } else {
        return Get("Stores", { storeId })
    }
}

export const UpdateStore = (store) => {
    return Post("Stores", store);
}

export const GetCurrentBudgetingPeriod = () => {
    return Get("Budget/Current");
}

export const GetBudgetingPeriods = () => {
    return Get("Budget/List");
}

export const GetBudgetingPeriod = (budgetingPeriodId) => {
    if(budgetingPeriodId == "new"){
        return new Promise((resolve) => {
            resolve({
                BudgetingPeriodId: null,
                StartDate: null,
                EndDate: null
            })
        })
    } else {
        return Get("Budget", { BudgetingPeriodId: budgetingPeriodId });
    }
}

export const UpdateBudgetingPeriod = (budgetingPeriod) => {
    return Post("Budget", budgetingPeriod);
}

export const CreatePurchase = (purchase) => {
    return Post("Purchases", purchase);
}

export const GetPurchases = () => {
    return Get("Purchases/List");
}

export const GetCategoriesGroupedInPeriod = () => {
    return Get("Categories/GroupedInPeriod");
}

export const GetRecurringCategoriesPaid = () => {
    return Get("Categories/RecurringCategoriesPaid");
}

/* ----------------------------------------------------------------------------- */

export const useGetCategories = () => {
    return useQuery({
        queryKey: ['Categories'],
        queryFn: GetCategories
    })
}

export const useGetCategory = (budgetingCategoryId) => {
    return useQuery({
        queryKey: ['Categories', budgetingCategoryId],
        queryFn: () => {
            return GetCategory(budgetingCategoryId)
        }
    })
}

export const useMutateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: UpdateCategory,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['Categories', data.BudgetingCategoryId]})
        }
    });
}

export const useGetStores = () => {
    return useQuery({
        queryKey: ['Stores'],
        queryFn: GetStores
    })
}

export const useGetStore = (storeId) => {
    return useQuery({
        queryKey: ['Stores', storeId],
        queryFn: () => {
            return GetStore(storeId)
        }
    })
}

export const useMutateStore = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: UpdateStore,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['Stores', data.StoreId]})
        }
    });
}

export const useGetBudgetingPeriods = () => {
    return useQuery({
        queryKey: ["BudgetingPeriods"],
        queryFn: () => {
            return GetBudgetingPeriods();
        }
    })
}

export const useGetBudgetingPeriod = (budgetingPeriodId) => {
    return useQuery({
        queryKey: ["BudgetingPeriods", budgetingPeriodId],
        queryFn: () => {
            return GetBudgetingPeriod(budgetingPeriodId);
        }
    })
}

export const useCurrentBudgetingPeriod = () => {
    return useQuery({
        queryKey: ["CurrentPeriod"],
        queryFn: () => {
            return GetCurrentBudgetingPeriod()
        }
    })
}

export const useMutateBudgetingPeriod = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: UpdateBudgetingPeriod,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['BudgetingPeriods', data.BudgetingPeriodId]})
        }
    })
}

export const useMutatePurchase = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: CreatePurchase,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Purchases"]});
        }
    })
}

export const useGetPurchases = () => {
    return useQuery({
        queryKey: ['Purchases'],
        queryFn: GetPurchases
    })
}

export const useGetCategoriesGroupedInPeriod = () => {
    return useQuery({
        queryKey: ['GetCategoriesGroupedInPeriod'],
        queryFn: GetCategoriesGroupedInPeriod
    })
}

export const useGetRecurringCategoriesPaid = () => {
    return useQuery({
        queryKey: ['GetRecurringCategoriesPaid'],
        queryFn: GetRecurringCategoriesPaid
    })
}
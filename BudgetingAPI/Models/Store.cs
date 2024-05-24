using System.ComponentModel.DataAnnotations;

public class Store {
    public int StoreId { get; set; }
    [MaxLength(255)]
    public string Name { get; set; }
    public BudgetingCategory? DefaultCategory { get; set; }

    public Store(){}
    public Store(string StoreName){
        Name = StoreName;
    }
    public Store (string StoreName, BudgetingCategory Category){
        Name = StoreName;
        DefaultCategory = Category;
    }
}
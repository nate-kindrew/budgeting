using System.ComponentModel.DataAnnotations;

public class BudgetingCategory {
    public int BudgetingCategoryId { get; set; }
    [MaxLength(255)]
    public string Name { get; set; }
    public double Amount { get; set; }
    public bool IsRecurring { get; set; }
    public DateTime? RecurrenceDate { get; set; }
}
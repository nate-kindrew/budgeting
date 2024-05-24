using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Purchase {
    public int PurchaseId { get; set; }
    public double Amount { get; set; }
    public DateTime CreatedDate { get; set; }
    [MaxLength(500)]
    public string Note { get; set; }
    public Store Store { get; set; }
    public BudgetingCategory? Budget { get; set; }

    [ForeignKey("BudgetingPeriod}")]
    public int BudgetingPeriodId { get; set; }
}
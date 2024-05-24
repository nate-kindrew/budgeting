using System.ComponentModel.DataAnnotations.Schema;

public class BudgetingPeriod {
    public int BudgetingPeriodId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public List<Purchase>? Purchases { get; set; }
    public BudgetingPeriod() {}
}
using Microsoft.EntityFrameworkCore;

public class BudgetingDbContext:DbContext {
    public BudgetingDbContext(DbContextOptions<BudgetingDbContext> options) : base(options) { }
    public DbSet<BudgetingCategory>? BudgetingCategories { get; set; }
    public DbSet<BudgetingPeriod>? BudgetingPeriods { get; set; }
    public DbSet<Purchase>? Purchases { get; set; }
    public DbSet<Store>? Stores { get; set; }
}
using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ILogger<CategoriesController> _logger;
    private readonly BudgetingDbContext _db;

    public CategoriesController(ILogger<CategoriesController> logger, BudgetingDbContext db){
        _logger = logger;
        _db = db;
    }

    [HttpGet]
    public BudgetingCategory Get(int budgetingCategoryId){
        return _db.BudgetingCategories.First(c => c.BudgetingCategoryId == budgetingCategoryId);
    }

    [HttpGet]
    [Route("List")]
    public List<BudgetingCategory> List(){
        return _db.BudgetingCategories.ToList();
    }

    [HttpPost]
    public void Post(BudgetingCategory update){
        if(update.BudgetingCategoryId != 0){
            BudgetingCategory category = _db.BudgetingCategories.First(bc => bc.BudgetingCategoryId == update.BudgetingCategoryId);
            if(category != null){
                category.Name = update.Name;
                category.Amount = update.Amount;
                category.IsRecurring = update.IsRecurring;
                category.RecurrenceDate = update.RecurrenceDate;
                _db.SaveChanges();
            }
        } else {
            _db.BudgetingCategories.Add(new BudgetingCategory(){
                Name = update.Name,
                Amount = update.Amount,
                IsRecurring = update.IsRecurring,
                RecurrenceDate = update.RecurrenceDate
            });
            _db.SaveChanges();
        }
    }

    
    
    [HttpGet]
    [Route("GroupedInPeriod")]
    public List<BudgetSummary> GroupedInPeriod(){
        BudgetingPeriod period = _db.BudgetingPeriods.Include("Purchases.Budget").FirstOrDefault(bp => bp.StartDate < DateTime.Now && DateTime.Now <= bp.EndDate);
        return _db.Purchases
            .Include("Budget")
            .Where(p => p.BudgetingPeriodId == period.BudgetingPeriodId)
            .GroupBy(p => p.Budget.Name)
            .Select(p => new BudgetSummary(){
                BudgetName = p.Key,
                PurchaseCount = p.Count(),
                TotalAmount = p.Sum(purchase => purchase.Amount),
                BudgetedAmount = p.First().Budget.Amount
            }).ToList();
    }
}
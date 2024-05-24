using System.Data.Common;
using Microsoft.AspNetCore.Mvc;

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
}
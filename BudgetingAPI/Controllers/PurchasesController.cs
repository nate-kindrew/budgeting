using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PurchasesController : ControllerBase
{
    private readonly ILogger<PurchasesController> _logger;
    private readonly BudgetingDbContext _db;

    public PurchasesController(ILogger<PurchasesController> logger, BudgetingDbContext db){
        _logger = logger;
        _db = db;
    }

    [HttpGet]
    public List<Purchase> Get(){
        return _db.Purchases.Include("Store").Include("Budget").OrderByDescending(p => p.CreatedDate).Take(25).ToList();
    }

    [HttpPost]
    public ObjectResult Post(Purchase update){
        BudgetingCategory category = _db.BudgetingCategories.FirstOrDefault(bc => bc.BudgetingCategoryId == update.Budget.BudgetingCategoryId);
        Store store = _db.Stores.First(s => s.StoreId == update.Store.StoreId);
        BudgetingPeriod period = _db.BudgetingPeriods.FirstOrDefault(bp => bp.StartDate < DateTime.Now && DateTime.Now <= bp.EndDate);

        if(period == null){
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = "No budgeting periods exist for today - please create one."});
        }

        update.Store = store;
        update.Budget = category;
        
        if(update.PurchaseId != 0){
            Purchase existing = _db.Purchases.FirstOrDefault(p => p.PurchaseId == update.PurchaseId);
            if(existing != null){
                existing.Amount = update.Amount;
                existing.Budget = update.Budget;
                existing.Store = update.Store;
                _db.SaveChanges();
            }
        } else {
            update.CreatedDate = DateTime.Now;
            _db.Purchases.Add(update);

            if(period.Purchases == null){
                period.Purchases = new List<Purchase>();
            }
            period.Purchases.Add(update);
            
            _db.SaveChanges();

        }
        return StatusCode(StatusCodes.Status200OK, update);
    }
}
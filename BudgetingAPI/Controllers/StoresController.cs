using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class StoresController : ControllerBase
{
    private readonly ILogger<StoresController> _logger;
    private readonly BudgetingDbContext _db;

    public StoresController(ILogger<StoresController> logger, BudgetingDbContext db){
        _logger = logger;
        _db = db;
    }

    [HttpGet]
    [Route("List")]
    public List<Store> List(){
        return _db.Stores.Include("DefaultCategory").ToList();
    }

    [HttpGet]
    public Store Get(int storeId) {
        return _db.Stores.Where(s => s.StoreId == storeId).Include("DefaultCategory").FirstOrDefault();
    }

    [HttpPost]
    public void Post(Store update){
        BudgetingCategory category = _db.BudgetingCategories.FirstOrDefault(bc => bc.BudgetingCategoryId == update.DefaultCategory.BudgetingCategoryId);
        if(update.StoreId != 0){
            Store existing = _db.Stores.First(s => s.StoreId == update.StoreId);
            
            if(existing != null){
                existing.Name = update.Name;
                existing.DefaultCategory = category != null ? category : null;
                _db.SaveChanges();
            }
        } else {
            var newStore = _db.Stores.Add(new Store(update.Name));
            newStore.Entity.DefaultCategory = category;
            _db.SaveChanges();
        }
    }
}
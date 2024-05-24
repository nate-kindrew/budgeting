using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class BudgetController : ControllerBase
{
    private readonly ILogger<CategoriesController> _logger;
    private readonly BudgetingDbContext _db;

    public BudgetController(ILogger<CategoriesController> logger, BudgetingDbContext db){
        _logger = logger;
        _db = db;
    }

    [HttpGet]
    public BudgetingPeriod Get(int BudgetingPeriodId){
        return _db.BudgetingPeriods.FirstOrDefault(bp => bp.BudgetingPeriodId == BudgetingPeriodId);
    }

    [HttpGet]
    [Route("Current")]
    public BudgetingPeriod Current(){
        return _db.BudgetingPeriods.Include("Purchases").Include("Purchases.Store").FirstOrDefault(bp => bp.StartDate <= DateTime.Now && bp.EndDate >= DateTime.Now);
    }

    [HttpGet]
    [Route("List")]
    public List<BudgetingPeriod> List(){
        return _db.BudgetingPeriods.OrderByDescending(bp => bp.StartDate).ToList();
    }

    [HttpPost]
    public void Post(BudgetingPeriod update){
        if(update.BudgetingPeriodId != 0){
            BudgetingPeriod bp = _db.BudgetingPeriods.FirstOrDefault(bp => bp.BudgetingPeriodId == update.BudgetingPeriodId);
            if(bp != null){
                bp.StartDate = update.StartDate;
                bp.EndDate = update.EndDate;
                _db.SaveChanges();
            }
        } else {
            _db.BudgetingPeriods.Add(new BudgetingPeriod(){
                StartDate = update.StartDate,
                EndDate = update.EndDate
            });
            _db.SaveChanges();
        }
    }
}
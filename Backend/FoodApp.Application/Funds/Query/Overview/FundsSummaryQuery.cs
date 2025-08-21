using FoodApp.Application.Funds.DataTransferObjects;
using FoodApp.Domain.Core.ValueObjects;
using FoodApp.Infrastructure.EntityFrameWork.Dbcontext;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodApp.Application.Funds.Query.Overview
{
    public record FundsSummaryQuery() : IRequest<OverviewResponseDto>;

    public class FundsSummaryQueryHandler(IFoodAppDbContext foodAppDbContext) : IRequestHandler<FundsSummaryQuery, OverviewResponseDto>
    {
        public async Task<OverviewResponseDto> Handle(FundsSummaryQuery request, CancellationToken cancellationToken)
        {
            // Get total sales grouped by ProductCategory
            var allOrderItems = await foodAppDbContext.Orders.AsNoTracking()
                .SelectMany(o => o.OrderItems)
                .GroupBy(oi => oi.ProductId)
                .ToListAsync(cancellationToken);
                
            var totalSalesByCategory = allOrderItems.Select(group => new
                {
                    ProductCategoryId = foodAppDbContext.Products.FirstOrDefault(x => x.Id == group.Key)?.Category.Id,
                    TotalSales = group.Sum(oi => oi.GetTotalPrice())
                });

            // Map sales to categories
            var totalChizlogSales = totalSalesByCategory
                .Where(x => x.ProductCategoryId == ProductCategory.Chizlog.Id)
                .Sum(x => x.TotalSales);

            var totalGcashSales = totalSalesByCategory
                .Where(x => x.ProductCategoryId == ProductCategory.GCash.Id)
                .Sum(x => x.TotalSales);

            var totalPrintSales = totalSalesByCategory
                .Where(x => x.ProductCategoryId == ProductCategory.Print.Id)
                .Sum(x => x.TotalSales);

            // Calculate total sales
            var totalSales = totalChizlogSales + totalGcashSales + totalPrintSales;

            var totalChizlogFunds = foodAppDbContext.Funds
                    .Where(f => f.ProductCategory.Id == ProductCategory.Chizlog.Id)
                    .Sum(f => f.Amount.Value);

            var totalGcashFunds = foodAppDbContext.Funds
                   .Where(f => f.ProductCategory.Id == ProductCategory.GCash.Id)
                   .Sum(f => f.Amount.Value);

            var totalPrintFunds = foodAppDbContext.Funds
                    .Where(f => f.ProductCategory.Id == ProductCategory.Print.Id)
                    .Sum(f => f.Amount.Value);

            var totalChizlogRevenue = Math.Abs(totalChizlogFunds - totalChizlogSales);
            var totalGcashRevenue = Math.Abs(totalGcashFunds - totalGcashSales);
            var totalPrintRevenue = Math.Abs(totalPrintFunds - totalPrintSales);

            var response = new OverviewResponseDto
            {
                TotalChizlogSales = totalChizlogSales,
                TotalGcashSales = totalGcashSales,
                TotalPrintSales = totalPrintSales,
                TotalSales = totalSales,
                TotalChizlogFunds = totalChizlogFunds,
                TotalGcashFunds = totalGcashFunds,
                TotalPrintFunds = totalPrintFunds,
                TotalChizlogRevenue = totalChizlogRevenue,
                TotalGcashRevenue = totalGcashRevenue,
                TotalPrintRevenue = totalPrintRevenue,
                TotalFunds = await foodAppDbContext.Funds.SumAsync(x => x.Amount.Value)
            };

            return response;
        }
    }
}

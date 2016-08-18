using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models;
using System.Data.Entity;

namespace DataAccess
{
    public class TradeNetworkService : IDisposable
    {
        private TradeNetworkContext db = new TradeNetworkContext();

        public ICollection<Product> GetProducts()
        {
            return db.Products.ToList();
        }

        public ICollection<Product> GetProductsCheaperThan(decimal maxPrice)
        {
            return db.Products
                .Where(p => p.Price < maxPrice)
                .ToList();
        }

        public decimal GetAverageOrderPriceInYear(int year)
        {
            return db.Orders
                .Where(o => o.Date.Year == year)
                .Average(o => o.Price);
        }

        public Product GetMostExpensiveProduct()
        {
            return db.Products
                .OrderByDescending(p => p.Price)
                .First();
        }

        public ICollection<Product> GetProductBoughtInYear(int year)
        {
            return db.Products
                .Where(p => p.Orders
                    .Where(o => o.Date.Year == year)
                    .Count() != 0)
                .OrderBy(p => p.Name).ToList();
        }

        public ICollection<ProductSalesInfo> GetUnpopularProducts(int year)
        {
            var result = db.Products
                .Select(p => new ProductSalesInfo {
                    Product = p,
                    CurrentYearSales = p.Orders.Where(o => o.Date.Year == year - 1).Count(),
                    PrevYearSales = p.Orders.Where(o => o.Date.Year == year).Count()
                })
                .Where(p => p.CurrentYearSales < p.PrevYearSales)
                .OrderBy(p => p.Product.Name);

            return result.ToList();
        }

        public ICollection<ShopStats> GetAveragePrices()
        {
            var result = db.Shops
                .Select(s => new ShopStats {
                    Shop = s,
                    AveragePrice = s.Products.Average(p => p.Price)
                })
                .OrderBy(s => s.Shop.Name);

            return result.ToList();
        }

        public ICollection<ShopStats> GetAmountOfSales(int year)
        {
            var result = db.Shops
                .Select(s => new ShopStats {
                    Shop = s,
                    AmountOfSales = s.Orders
                        .Where(o => o.Date.Year == year)
                        .Sum(o => (int?)o.Amount) ?? 0
                })
                .Where(s => s.AmountOfSales > 0)
                .OrderByDescending(s => s.AmountOfSales);

            return result.ToList();
        }

        public ICollection<CustomerCostsInfo> GetRichPeople(decimal minCosts)
        {
            var result = db.Customers
                .Select(c => new CustomerCostsInfo
                {
                    Customer = c,
                    Costs = c.Orders.Sum(o => o.Price)
                })
                .Where(c => c.Costs >= minCosts)
                .OrderByDescending(c => c.Costs);

            return result.ToList();
        }

        public async Task IncreaseProductCosts(double multiplier, decimal maxCost)
        {
            foreach (var product in db.Products) {
                if (product.Price < maxCost) {
                    product.Price *= (decimal)multiplier;
                }
            }

            await db.SaveChangesAsync();
        }

        public async Task DeleteOldOrders(int year)
        {
            db.Orders.RemoveRange(db.Orders.Where(o => o.Date.Year <= year));
            await db.SaveChangesAsync();
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}

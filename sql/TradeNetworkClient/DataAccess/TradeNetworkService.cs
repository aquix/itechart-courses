using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models;

namespace DataAccess
{
    public class TradeNetworkService
    {
        private TradeNetworkContext db = new TradeNetworkContext();

        public void printProducts()
        {
            foreach (var product in db.Products) {
                Console.WriteLine($"{product.Id}\t{product.Name}\t{product.Price}");
            }
        }

        public void printProductsCheaperThan(decimal maxPrice)
        {
            var result = db.Products.Where(p => p.Price < maxPrice);
            foreach (var product in result) {
                Console.WriteLine($"{product.Id}\t{product.Name}\t{product.Price}");
            }
        }

        public void printAverageOrderPriceInYear(int year)
        {
            var result = db.Orders
                .Where(o => o.Date.Year == year)
                .Average(o => o.Price);

            Console.WriteLine(result);
        }

        public void printMostExpensiveProduct()
        {
            var result = db.Products.OrderByDescending(p => p.Price).First();
            Console.WriteLine($"{result.Id}\t{result.Name}\t{result.Price}");
        }

        public void printProductBoughtInYear(int year)
        {
            var result = db.Products
                .Where(p => p.Orders
                    .Where(o => o.Date.Year == year)
                    .Count() != 0)
                .OrderBy(p => p.Name);

            var res = result.ToList();

            foreach (var product in result) {
                Console.WriteLine($"{product.Id}\t{product.Name}");
            }
        }

        public void printUnpopularProducts(int year)
        {
            var startDate = new DateTime(year - 1, 1, 1);
            var endDate = new DateTime(year - 1, 12, 31);

            var salesPrev = getSalesCount(startDate, endDate);
            var sales = getSalesCount(startDate.AddYears(1), endDate.AddYears(1));

            var compareTable = salesPrev
                .Select(s => new {
                    Id = s.Id,
                    SalesPrev = s.Count,
                    Sales = sales.FirstOrDefault(i => i.Id == s.Id) != null ? sales.First(i => i.Id == s.Id).Count : 0
                });

            var result = compareTable
                .Where(item => item.Sales < item.SalesPrev)
                .Join(db.Products,
                    item => item.Id,
                    p => p.Id,
                    (item, p) => new {
                        Id = item.Id,
                        SalesInCurrentYear = item.Sales,
                        SalesInPrevYear = item.SalesPrev,
                        Name = p.Id
                    });

            foreach (var item in result) {
                Console.WriteLine($"{item.Id}\t{item.Name}\t{item.SalesInCurrentYear}\t{item.SalesInPrevYear}");
            }
        }

        private IQueryable<SalesCount> getSalesCount(DateTime startDate, DateTime endDate)
        {
            return db.Products
                .Where(p => p.Orders
                    .Where(o => o.Date >= startDate && o.Date <= endDate)
                    .Count() != 0)
                .GroupBy(p => p.Id)
                .Select(g => new SalesCount { Id = g.Key, Count = g.Count() });
        }

        public void printAveragePrices()
        {
            var result = db.Shops
                .Select(s => new
                {
                    Id = s.Id,
                    Name = s.Name,
                    AveragePrice = s.Products.Average(p => p.Price)
                })
                .OrderBy(s => s.Name).ToList();

            foreach (var shop in result) {
                Console.WriteLine($"{shop.Id}\t{shop.Name}\t{shop.AveragePrice}");
            }
        }

        public void printAmountOfSales(int year)
        {
            var result = db.Shops
                .Select(s => new {
                    Id = s.Id,
                    Name = s.Name,
                    Amount = s.Orders
                        .Where(o => o.Date.Year == year)
                        .Sum(o => (int?)o.Amount) ?? 0
                })
                .Where(s => s.Amount > 0)
                .OrderByDescending(s => s.Amount);

            foreach (var shop in result) {
                Console.WriteLine($"{shop.Id}\t{shop.Name}\t{shop.Amount}");
            }
        }

        public void printRichPeople(decimal minCosts)
        {
            var result = db.Customers
                .Select(c => new
                {
                    Id = c.Id,
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    Costs = c.Orders.Sum(o => o.Price)
                })
                .Where(c => c.Costs >= minCosts)
                .OrderByDescending(c => c.Costs);

            foreach (var customer in result) {
                Console.WriteLine($"{customer.Id}\t{customer.FirstName}\t{customer.LastName}\t{customer.Costs}");
            }
        }

        public void increaseProductCosts(double multiplier, decimal maxCost)
        {
            foreach (var product in db.Products) {
                if (product.Price < maxCost) {
                    product.Price *= (decimal)multiplier;
                }
            }

            db.SaveChanges();

            foreach (var product in db.Products) {
                Console.WriteLine($"{product.Id}\t{product.Name}\t{product.Price}");
            }
            Console.WriteLine("Done!");
        }

        public void deleteOldOrders(int year)
        {
            db.Orders.RemoveRange(db.Orders.Where(o => o.Date.Year <= year));
            db.SaveChanges();

            foreach (var order in db.Orders.OrderByDescending(o => o.Date)) {
                Console.WriteLine($"{order.Id}\t{order.Date}");
            }
            Console.WriteLine("Done!");
        }
    }
}

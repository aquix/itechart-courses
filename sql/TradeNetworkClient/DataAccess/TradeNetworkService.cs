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

            foreach (var product in result) {
                Console.WriteLine($"{product.Id}\t{product.Name}");
            }
        }

        public void printUnpopularProducts(int year)
        {
            var result = db.Products
                .Select(p => new
                {
                    Id = p.Id,
                    Name = p.Name,
                    SalesInPrevYear = p.Orders.Where(o => o.Date.Year == year - 1).Count(),
                    SalesInCurrentYear = p.Orders.Where(o => o.Date.Year == year).Count()
                })
                .Where(p => p.SalesInCurrentYear < p.SalesInPrevYear)
                .OrderBy(p => p.Name);
            

            foreach (var product in result) {
                Console.WriteLine($"{product.Id}\t{product.Name}\t{product.SalesInPrevYear}\t{product.SalesInCurrentYear}");
            }
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

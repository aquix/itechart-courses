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
            var startDate = new DateTime(year, 1, 1);
            var endDate = new DateTime(year, 12, 31);
            var result = db.Orders
                .Where(o => o.Date >= startDate && o.Date <= endDate)
                .Average(o => o.Price);

            Console.WriteLine(result);
        }

        public void printMostExpensiveProduct()
        {
            var result = db.Products.OrderByDescending(p => p.Price).First();
            Console.WriteLine($"{result.Id}\t{result.Name}\t{result.Price}");
        }
    }
}

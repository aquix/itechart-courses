using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;
using DataAccess.Models;

namespace Client
{
    class Program
    {
        static void Main(string[] args)
        {
            var dbService = new TradeNetworkService();
            while (true) {
                Console.WriteLine(@"
1. All Products
2. Products cheaper than
3. Average order price in year
4. Most expensive product
5. Product bought in year
6. Less popular products in year
7. Average price in shops
8. Amount of sales in shops in year
9. Rich customers
10. Increase price of products
11. Delete old orders");
                var choice = int.Parse(Console.ReadLine());
                var year = 0;
                switch (choice) {
                    case 1:
                        dbService.printProducts();
                        break;
                    case 2:
                        Console.WriteLine("Max price: ");
                        var maxPrice = decimal.Parse(Console.ReadLine());
                        dbService.printProductsCheaperThan(maxPrice);
                        break;
                    case 3:
                        Console.WriteLine("Year: ");
                        year = int.Parse(Console.ReadLine());
                        dbService.printAverageOrderPriceInYear(year);
                        break;
                    case 4:
                        dbService.printMostExpensiveProduct();
                        break;
                    case 5:
                        Console.WriteLine("Year: ");
                        year = int.Parse(Console.ReadLine());
                        dbService.printProductBoughtInYear(year);
                        break;
                    case 6:
                        Console.WriteLine("Year: ");
                        year = int.Parse(Console.ReadLine());
                        dbService.printUnpopularProducts(year);
                        break;
                    case 7:
                        dbService.printAveragePrices();
                        break;
                    case 8:
                        Console.WriteLine("Year: ");
                        year = int.Parse(Console.ReadLine());
                        dbService.printAmountOfSales(year);
                        break;
                    case 9:
                        Console.WriteLine("Min costs: ");
                        var minCosts = decimal.Parse(Console.ReadLine());
                        dbService.printRichPeople(minCosts);
                        break;
                    case 10:
                        Console.WriteLine("Multiplier: ");
                        var multiplier = double.Parse(Console.ReadLine());
                        Console.WriteLine("Max cost: ");
                        var maxCost = decimal.Parse(Console.ReadLine());
                        dbService.increaseProductCosts(multiplier, maxCost);
                        break;
                    case 11:
                        Console.WriteLine("Max year: ");
                        var maxYear = int.Parse(Console.ReadLine());
                        dbService.deleteOldOrders(maxYear);
                        break;
                }
            }
        }
    }
}

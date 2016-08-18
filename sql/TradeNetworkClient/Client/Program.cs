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
            Task.Run(async () => {
                MainLoop();
            }).Wait();
        }

        static async Task MainLoop()
        {
            using (var dbService = new TradeNetworkService()) {
                var presenter = new ModelsPresenter();
                while (true) {
                    Console.WriteLine(@"
1. All Products
2. Products cheaper than
3. Average order price in year
4. Most expensive product
5. Products bought in year
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
                            var products = dbService.GetProducts();
                            Console.WriteLine(presenter.Present(products));
                            break;
                        case 2:
                            Console.WriteLine("Max price: ");
                            var maxPrice = decimal.Parse(Console.ReadLine());
                            products = dbService.GetProductsCheaperThan(maxPrice);
                            Console.WriteLine(presenter.Present(products));
                            break;
                        case 3:
                            Console.WriteLine("Year: ");
                            year = int.Parse(Console.ReadLine());
                            var averagePrice = dbService.GetAverageOrderPriceInYear(year);
                            Console.WriteLine(averagePrice);
                            break;
                        case 4:
                            var product = dbService.GetMostExpensiveProduct();
                            Console.WriteLine(presenter.Present(product));
                            break;
                        case 5:
                            Console.WriteLine("Year: ");
                            year = int.Parse(Console.ReadLine());
                            products = dbService.GetProductBoughtInYear(year);
                            Console.WriteLine(presenter.Present(products));
                            break;
                        case 6:
                            Console.WriteLine("Year: ");
                            year = int.Parse(Console.ReadLine());
                            var info = dbService.GetUnpopularProducts(year);
                            Console.WriteLine(presenter.Present(info));
                            break;
                        case 7:
                            var stats = dbService.GetAveragePrices();
                            Console.WriteLine(presenter.Present(stats));
                            break;
                        case 8:
                            Console.WriteLine("Year: ");
                            year = int.Parse(Console.ReadLine());
                            stats = dbService.GetAmountOfSales(year);
                            Console.WriteLine(presenter.Present(stats));
                            break;
                        case 9:
                            Console.WriteLine("Min costs: ");
                            var minCosts = decimal.Parse(Console.ReadLine());
                            var customersInfo = dbService.GetRichPeople(minCosts);
                            Console.WriteLine(presenter.Present(customersInfo));
                            break;
                        case 10:
                            Console.WriteLine("Multiplier: ");
                            var multiplier = double.Parse(Console.ReadLine());
                            Console.WriteLine("Max cost: ");
                            var maxCost = decimal.Parse(Console.ReadLine());
                            await dbService.IncreaseProductCosts(multiplier, maxCost);
                            break;
                        case 11:
                            Console.WriteLine("Max year: ");
                            var maxYear = int.Parse(Console.ReadLine());
                            await dbService.DeleteOldOrders(maxYear);
                            break;
                    }
                }
            }
        }
    }
}

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
                        var year = int.Parse(Console.ReadLine());
                        dbService.printAverageOrderPriceInYear(year);
                        break;
                    case 4:
                        dbService.printMostExpensiveProduct();
                        break;
                    case 5:
                        break;
                    case 6:
                        break;
                    case 7:
                        break;
                    case 8:
                        break;
                    case 9:
                        break;
                    case 10:
                        break;
                    case 11:
                        break;
                }
            }
        }
    }
}

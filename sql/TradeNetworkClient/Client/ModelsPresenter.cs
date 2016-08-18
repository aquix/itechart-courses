using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models;

namespace Client
{
    public class ModelsPresenter
    {
        public string Present(Product product)
        {
            return $"Name: {product.Name} Price: {product.Price}$";
        }

        public string Present(IEnumerable<Product> products)
        {
            return string.Join("\n", products.Select(p => this.Present(p)));
        }

        public string Present(ProductSalesInfo info)
        {
            return $"{Present(info.Product)} {info.PrevYearSales} {info.CurrentYearSales}";
        }

        public string Present(IEnumerable<ProductSalesInfo> infos)
        {
            return string.Join("\n", infos.Select(i => this.Present(i)));
        }

        public string Present(ShopStats stat)
        {
            var result = $"Name: {stat.Shop.Name}";

            if (stat.AmountOfSales == null) {
                result += $" Amount of sales: {stat.AmountOfSales}";
            }

            if (stat.AveragePrice == null) {
                result += $" Average price: {stat.AveragePrice}";
            }

            return result;
        }

        public string Present(IEnumerable<ShopStats> stats)
        {
            return string.Join("\n", stats.Select(s => this.Present(s)));
        }

        public string Present(CustomerCostsInfo info)
        {
            return $"{Present(info.Customer)} Costs: {info.Costs}";
        }

        public string Present(IEnumerable<CustomerCostsInfo> infos)
        {
            return string.Join("\n", infos.Select(i => this.Present(i)));
        }

        public string Present(Customer customer)
        {
            return $"{customer.FirstName} {customer.LastName}";
        }
    }
}

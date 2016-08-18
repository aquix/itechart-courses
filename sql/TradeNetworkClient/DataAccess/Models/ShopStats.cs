using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class ShopStats
    {
        public Shop Shop { get; set; }
        public decimal? AveragePrice { get; set; }
        public int? AmountOfSales { get; set; }
    }
}

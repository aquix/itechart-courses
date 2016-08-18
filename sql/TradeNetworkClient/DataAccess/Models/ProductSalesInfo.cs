using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class ProductSalesInfo
    {
        public Product Product { get; set; }
        public int CurrentYearSales { get; set; }
        public int PrevYearSales { get; set; }
    }
}

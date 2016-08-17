using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
        public int CustomerId { get; set; }
        public int ShopId { get; set; }

        public Customer Customer { get; set; }
        public Shop Shop { get; set; }
        public List<Product> Products { get; set; }
    }
}

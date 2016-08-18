using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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

        public virtual Customer Customer { get; set; }
        public virtual Shop Shop { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}

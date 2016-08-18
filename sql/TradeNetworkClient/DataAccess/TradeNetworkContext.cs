using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models;

namespace DataAccess
{
    public class TradeNetworkContext : DbContext
    {
        public TradeNetworkContext() : base("TradeNetwork") { }

        public DbSet<Shop> Shops { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>().Property(c => c.FirstName).HasColumnName("first_name");
            modelBuilder.Entity<Customer>().Property(c => c.LastName).HasColumnName("last_name");


            modelBuilder.Entity<Product>()
                .HasMany(p => p.Orders)
                .WithMany(o => o.Products)
                .Map(po => {
                    po.MapLeftKey("product_id");
                    po.MapRightKey("order_id");
                    po.ToTable("orders_products");
                });

            modelBuilder.Entity<Shop>()
                .HasMany(s => s.Products)
                .WithMany(p => p.Shops)
                .Map(po => {
                    po.MapLeftKey("shop_id");
                    po.MapRightKey("product_id");
                    po.ToTable("shops_products");
                });

            modelBuilder.Entity<Order>()
                .HasRequired(o => o.Shop)
                .WithMany(s => s.Orders)
                .Map(os => {
                    os.MapKey("shop_id");
                });

            modelBuilder.Entity<Order>()
                .HasRequired(o => o.Customer)
                .WithMany(c => c.Orders);

            base.OnModelCreating(modelBuilder);
        }
    }
}

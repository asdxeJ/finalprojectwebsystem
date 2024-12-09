using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    // aplication DB context is going to allow you to search your individual tables
    public class ApplicationDBContext : IdentityDbContext<AppUser> //DbContext
    {
        // ctor shortcut for constructor creation
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions) // base will pass dbContextOptions to db context
        {

        }

        // dbset allows us to search for the tables and create the data for us
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // declare fk's
            builder.Entity<Cart>(x => x.HasKey(c => new { c.AppUserId, c.MenuId }));

            //connect them to the table
            // foreign key relationships
            builder.Entity<Cart>()
                .HasOne(u => u.AppUser)
                .WithMany(u => u.CartItems)
                .HasForeignKey(c => c.AppUserId);

            builder.Entity<Cart>()
                .HasOne(u => u.Menu)
                .WithMany(u => u.CartItems)
                .HasForeignKey(c => c.MenuId);

            builder.Entity<Order>()
                .HasOne(o => o.AppUser)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.AppUserId);

            // OrderItem FK configuration
            builder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId);

            builder.Entity<OrderItem>()
                .HasOne(oi => oi.Menu)
                .WithMany(m => m.OrderItems)
                .HasForeignKey(oi => oi.MenuId);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
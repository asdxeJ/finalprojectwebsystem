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
    public class ApplicationDBContext : DbContext
    {
        // ctor shortcut for constructor creation
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions) // base will pass dbContextOptions to db context
        {

        }

        // dbset allows us to search for the tables and create the data for us
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Cart> Carts { get; set; }

    }
}
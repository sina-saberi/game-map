using game_maps.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace game_maps.Infrastructure.Contexts
{
    public class GameMapsContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public GameMapsContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Game> Games => Set<Game>();
        public DbSet<Group> Groups => Set<Group>();
        public DbSet<Map> Maps => Set<Map>();
        public DbSet<Categorie> Categories => Set<Categorie>();
        public DbSet<Location> Locations => Set<Location>();
        public DbSet<Media> Medias => Set<Media>();
        public DbSet<UserMark> UserMarks => Set<UserMark>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(GameMapsContext).Assembly);
        }
    }
}

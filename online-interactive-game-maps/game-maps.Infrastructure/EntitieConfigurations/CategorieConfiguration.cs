using game_maps.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Infrastructure.EntitieConfigurations
{
    public class CategorieConfiguration : IEntityTypeConfiguration<Categorie>
    {
        public void Configure(EntityTypeBuilder<Categorie> builder)
        {

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Title).IsRequired().HasMaxLength(50);
            builder.Property(x => x.Description).IsRequired(false).HasMaxLength(500);
            builder.Property(x => x.Info).IsRequired(false).HasMaxLength(500);
            builder.Property(x => x.Icon).IsRequired().HasMaxLength(30);
            builder.Property(x => x.Template).IsRequired(false).HasMaxLength(100);
            builder.Property(x => x.Order).IsRequired();
            builder.Property(x => x.Visible).IsRequired();
            builder.Property(x => x.HasHeatmap).IsRequired();
            builder.Property(x => x.FeaturesEnabled).IsRequired();
            builder.Property(x => x.IgnEnabled).IsRequired();

            builder.HasMany(x => x.Locations).WithOne(x => x.Categorie).HasForeignKey(x => x.CategorieId);
        }
    }
}

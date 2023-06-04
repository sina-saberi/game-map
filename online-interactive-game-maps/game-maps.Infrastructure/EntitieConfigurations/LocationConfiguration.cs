using game_maps.Core.Entities;
using game_maps.Core.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Infrastructure.EntitieConfigurations
{
    public class LocationConfiguration : IEntityTypeConfiguration<Location>
    {
        public void Configure(EntityTypeBuilder<Location> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Title).IsRequired().HasMaxLength(200);
            builder.Property(x => x.Description).IsRequired(false).HasMaxLength(800);
            builder.Property(x => x.Latitude).IsRequired();
            builder.Property(x => x.Longitude).IsRequired();
            builder.Property(x => x.Features).HasMaxLength(300);
            builder.Property(x => x.IgnPageId).HasMaxLength(150);
            builder.Property(x => x.IgnMarkerId).HasMaxLength(150);
            builder.Property(x => x.CategorieId).IsRequired(false);
            builder.Property(x => x.Type).HasDefaultValue(LocationType.Location);
            builder.Property(x => x.UserId).IsRequired(false);

            builder.HasMany(x => x.Medias).WithOne().HasForeignKey(x => x.LocationId);
            builder.HasMany(x => x.UserMarks).WithOne().HasForeignKey(x => x.LocationId);
        }
    }
}

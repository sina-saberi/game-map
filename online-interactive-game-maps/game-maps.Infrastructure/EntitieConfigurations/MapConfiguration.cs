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
    public class MapConfiguration : IEntityTypeConfiguration<Map>
    {
        public void Configure(EntityTypeBuilder<Map> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Title).IsRequired().HasMaxLength(30);
            builder.Property(x => x.Description).IsRequired(false).HasMaxLength(500);
            builder.Property(x => x.Path).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Extension).IsRequired().HasMaxLength(50);
            builder.Property(x => x.MinZoom).IsRequired();
            builder.Property(x => x.MaxZoom).IsRequired();
            builder.Property(x => x.Slug).IsRequired().HasMaxLength(40).IsUnicode();

            builder.HasMany(x => x.Locations).WithOne().HasForeignKey(x => x.MapId);
        }
    }
}

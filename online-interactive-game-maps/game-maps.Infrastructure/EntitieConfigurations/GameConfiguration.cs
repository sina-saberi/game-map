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
    public class GameConfiguration : IEntityTypeConfiguration<Game>
    {
        public void Configure(EntityTypeBuilder<Game> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Title).IsRequired().HasMaxLength(30);
            builder.Property(x => x.Slug).IsRequired().HasMaxLength(30).IsUnicode();
            builder.Property(x => x.Image).IsRequired().HasMaxLength(200);
            builder.Property(x => x.Logo).IsRequired().HasMaxLength(200);

            builder.HasMany(x => x.Maps).WithOne().HasForeignKey(x => x.GameId);
        }
    }
}

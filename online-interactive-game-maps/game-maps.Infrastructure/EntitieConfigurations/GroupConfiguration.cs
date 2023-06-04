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
    public class GroupConfiguration : IEntityTypeConfiguration<Group>
    {
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Title).IsRequired().HasMaxLength(30);
            builder.Property(x => x.Order).IsRequired();
            builder.Property(x => x.Color).IsRequired().HasMaxLength(50);
            builder.Property(x => x.Expandable).IsRequired();

            builder.HasMany(x => x.Categories).WithOne(x => x.Group).HasForeignKey(x => x.GroupId);
        }
    }
}

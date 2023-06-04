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
    public class UserMarkConfiguration : IEntityTypeConfiguration<UserMark>
    {
        public void Configure(EntityTypeBuilder<UserMark> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.IsDone).IsRequired();
            builder.Property(x => x.UserId).IsRequired();
            builder.Property(x => x.LocationId).IsRequired();
        }
    }
}

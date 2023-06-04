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
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasMany(x => x.UserMarks).WithOne().HasForeignKey(x => x.UserId);
            builder.HasMany(x => x.Locations).WithOne().HasForeignKey(x => x.UserId);
        }
    }
}

using game_maps.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace game_maps.Infrastructure.EntitieConfigurations
{
    public class MediaConfiguration : IEntityTypeConfiguration<Media>
    {
        public void Configure(EntityTypeBuilder<Media> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Title).IsRequired(false).HasMaxLength(50);
            builder.Property(x => x.FileName).IsRequired(false).HasMaxLength(100);
            builder.Property(x => x.Attribution).IsRequired(false).HasMaxLength(100);
            builder.Property(x => x.Type).IsRequired(false).HasMaxLength(50);
            builder.Property(x => x.MimeType).IsRequired(false).HasMaxLength(50);
            builder.Property(x => x.Meta).IsRequired(false).HasMaxLength(50);
        }
    }
}

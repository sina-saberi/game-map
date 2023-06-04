using game_maps.Core.Base;
using game_maps.Core.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Core.Entities
{
    public class Location : BaseEntitie
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string? Features { get; set; }
        public string? IgnMarkerId { get; set; }
        public string? IgnPageId { get; set; }
        public int MapId { get; set; }
        public int? CategorieId { get; set; }
        public Guid? UserId { get; set; }
        public LocationType Type { get; set; }
        public ICollection<UserMark>? UserMarks { get; set; }
        public Categorie? Categorie { get; set; }
        public ICollection<Media>? Medias { get; set; }
    }
}

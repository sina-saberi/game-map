using game_maps.Core.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Core.Entities
{
    public class Categorie : BaseEntitie
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public string? Info { get; set; }
        public string Icon { get; set; } = "";
        public string Template { get; set; } = "";
        public int Order { get; set; }
        public bool Visible { get; set; }
        public bool HasHeatmap { get; set; }
        public bool FeaturesEnabled { get; set; }
        public bool IgnEnabled { get; set; }
        public int GroupId { get; set; }
        public Group? Group { get; set; }
        public ICollection<Location> Locations { get; set; } = new List<Location>();
    }
}

using game_maps.Application.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Application.ViewModels.Categorie
{
    public class CategorieViewModel : BaseViewModel
    {
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
        public int Count { get; set; }
    }
}

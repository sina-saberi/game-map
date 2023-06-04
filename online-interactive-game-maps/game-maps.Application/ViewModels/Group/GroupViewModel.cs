using game_maps.Application.Base;
using game_maps.Application.ViewModels.Categorie;
using game_maps.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Application.ViewModels.Group
{
    public class GroupViewModel : BaseViewModel
    {
        public string Title { get; set; } = "";
        public int Order { get; set; }
        public string Color { get; set; } = "";
        public bool Expandable { get; set; }
        public ICollection<CategorieViewModel>? Categories { get; set; }
    }
}

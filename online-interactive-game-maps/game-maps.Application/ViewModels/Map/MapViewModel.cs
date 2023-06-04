using game_maps.Application.Base;
using game_maps.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Application.ViewModels.Map
{
    public class MapViewModel : BaseViewModel
    {
        public string Title { get; set; } = "";
        public string Slug { get; set; } = "";
    }
}

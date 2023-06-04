using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Application.ViewModels.Location
{
    public class AddLocationViewModel
    {
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string MapSlug { get; set; } = "";
    }
}

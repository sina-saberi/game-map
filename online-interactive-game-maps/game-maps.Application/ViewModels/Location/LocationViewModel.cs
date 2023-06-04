using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Application.ViewModels.Location
{
    public class LocationViewModel
    {
        public int Id { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string? CategorieName { get; set; }
        public string? Icon { get; set; }
        public bool? IsDone { get; set; }
    }
}

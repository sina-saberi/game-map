using game_maps.Application.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Application.ViewModels.Map
{
    public class MapDetailViewModel : BaseViewModel
    {
        public string Title { get; set; } = "";
        public string Slug { get; set; } = "";
        public string Description { get; set; } = "";
        public string Path { get; set; } = "";
        public int MinZoom { get; set; }
        public int MaxZoom { get; set; }
        public string Extension { get; set; } = "";
        public float StartLatBound { get; set; }
        public float StartLonBound { get; set; }
        public float EndtLatBound { get; set; }
        public float EndtLonBound { get; set; }
        public float InitialLat { get; set; }
        public float InitialLon { get; set; }
        public int InitialZoom { get; set; }
    }
}

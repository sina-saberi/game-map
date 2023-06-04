using game_maps.Core.Base;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Core.Entities
{
    public class Game : BaseEntitie
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Slug { get; set; } = "";
        public string Image { get; set; } = "";
        public string Logo { get; set; } = "";
        public ICollection<Map>? Maps { get; set; }
    }
}

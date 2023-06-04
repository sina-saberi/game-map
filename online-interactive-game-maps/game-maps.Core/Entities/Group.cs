using game_maps.Core.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Core.Entities
{
    public class Group : BaseEntitie
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public int Order { get; set; }
        public string Color { get; set; } = "";
        public bool Expandable { get; set; }
        public ICollection<Categorie> Categories { get; set; } = new List<Categorie>();
    }
}

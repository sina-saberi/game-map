using game_maps.Core.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Core.Entities
{
    public class UserMark : BaseEntitie
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public int LocationId { get; set; }
        public bool IsDone { get; set; }
    }
}

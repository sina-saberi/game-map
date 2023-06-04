using game_maps.Application.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Application.ViewModels.Location
{
    public class UserLocationMarkViewModel : BaseViewModel
    {
        public bool IsDone { get; set; }
        public int LocationId { get; set; }
    }
}

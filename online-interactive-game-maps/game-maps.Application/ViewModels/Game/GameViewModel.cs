using game_maps.Application.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Application.ViewModels.Game
{
    public class GameViewModel : BaseViewModel
    {
        public string Title { get; set; } = "";
        public string Slug { get; set; } = "";
        public string Image { get; set; } = "";
        public string Logo { get; set; } = "";
    }
}

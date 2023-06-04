using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Application.ViewModels.User
{
    public class UserRegiserViewModel
    {
        public string UserName { get; init; } = "";
        public string Password { get; init; } = "";
        public string Email { get; init; } = "";
    }
}

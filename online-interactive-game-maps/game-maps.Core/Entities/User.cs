using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Core.Entities
{
    public class User : IdentityUser<Guid>
    {
        public ICollection<UserMark>? UserMarks { get; set; }
        public ICollection<Location>? Locations { get; set; }
    }
}

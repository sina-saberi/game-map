using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Infrastructure.Models
{
    public class JwtConfig
    {
        public string ValidIssuers { get; set; } = "";
        public string ValidAudience { get; set; } = "";
        public string Secret { get; set; } = "";
        public int ExpiresIn { get; set; }
    }
}

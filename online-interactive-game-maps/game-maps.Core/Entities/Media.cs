using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Core.Entities
{
    public class Media
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public string? Attribution { get; set; }
        public string? Type { get; set; }
        public string? MimeType { get; set; }
        public string? Meta { get; set; }
        public int Order { get; set; }
        public int LocationId { get; set; }
    }
}

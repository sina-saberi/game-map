using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using game_maps.Application.IServices;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Png;
using System.Buffers.Text;
using SixLabors.ImageSharp.Advanced;
using static System.Net.WebRequestMethods;
using Microsoft.VisualBasic;
using SixLabors.ImageSharp.Drawing.Processing;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Reflection;
using SixLabors.ImageSharp.Processing;
using Azure;

namespace game_maps.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private readonly IMapService maps;
        private readonly IWebHostEnvironment env;
        private const int TileSize = 256;
        public MapController(IMapService maps, IWebHostEnvironment _env)
        {
            this.maps = maps;
            env = _env;
        }

        [HttpGet(nameof(GetMaps))]
        public async Task<IActionResult> GetMaps(string slug)
        {
            var res = await maps.GetAll(slug);
            if (res is not null)
                return Ok(res);
            return NotFound();
        }

        [HttpGet(nameof(GetMap))]
        public async Task<IActionResult> GetMap(string slug)
        {
            var res = await maps.Get(slug);
            if (res is not null)
                return Ok(res);
            return BadRequest();
        }

        [HttpGet("{name}/{x}/{y}/{z}")]
        public async Task<IActionResult> Get(string name, int x, int y, int z)
        {
            using (var destinationImage = new Image<Rgba32>(TileSize, TileSize))
            {
                destinationImage.Mutate(ctx =>
                {
                    
                });

                Stream outputStream = new MemoryStream();

                destinationImage.Save(outputStream, new PngEncoder());
                outputStream.Seek(0, SeekOrigin.Begin);
                return this.File(outputStream, "image/png");
            }
        }
    }
}


//int size = Convert.ToInt32(Math.Pow(2, z) * 256);
//image.Mutate(c =>
//{
//    c.Resize(size, size);
//    c.Crop(new Rectangle(x * TileSize, y * TileSize, TileSize, TileSize));
//});

//using (Image map = Image.Load($"{env.WebRootPath}/media/maps/{name}"))
//using (Image<Rgba32> image = new(TileSize, TileSize))
//using (var outputStream = new MemoryStream())
//{
//    var zoom = Convert.ToInt32(Math.Pow(2, z) / 2);
//    map.Mutate(imageContext =>
//    {
//        imageContext.Resize(zoom, zoom);
//    });

//    image.Mutate(imageContext =>
//    {
//        imageContext.DrawImage(map, new Point(zoom / 2, zoom / 2), 1f);
//    });

//    image.SaveAsPng(outputStream);
//    var bytes = outputStream.ToArray();

//    Response.ContentType = "image/png";
//    await Response.Body.WriteAsync(bytes);
//    return Ok();
//}

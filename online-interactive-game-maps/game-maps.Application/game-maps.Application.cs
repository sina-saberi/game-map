using AutoMapper;
using game_maps.Application.Configurations;
using game_maps.Application.IServices;
using game_maps.Application.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Application
{
    public static class GameMapsApplication
    {
        public static void ConfigureGameMapsApplication(this IServiceCollection services)
        {
            var cfg = new AutoMapper.MapperConfiguration(x =>
            {
                x.AddProfile(new AutoMapperConfig());
            });
            services.AddSingleton(cfg.CreateMapper());
            services.AddScoped<IGameService, GameService>();
            services.AddScoped<IMapService, MapService>();
            services.AddScoped<IGroupService, GroupService>();
            services.AddScoped<ILocationService, LocationService>();
        }
    }
}

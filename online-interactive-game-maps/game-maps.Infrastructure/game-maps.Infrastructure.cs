using game_maps.Core.Entities;
using game_maps.Infrastructure.Contexts;
using game_maps.Infrastructure.Models;
using game_maps.Infrastructure.Utility;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Unicode;
using System.Threading.Tasks;

namespace game_maps.Infrastructure
{
    public static class GameMapsInfrastructure
    {
        public static void ConfigureGameMapsInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var config = configuration.GetSection("JwtConfig");
            services.Configure<JwtConfig>(config);

            services.AddDbContext<GameMapsContext>(o =>
            {
                o.UseSqlServer(configuration.GetConnectionString("OnlineCourse")!);
            });

            services.AddIdentityCore<User>()
                .AddEntityFrameworkStores<GameMapsContext>();

            services.Configure<IdentityOptions>(x =>
            {
                x.Password.RequireUppercase = false;
                x.Password.RequireNonAlphanumeric = false;
                x.Password.RequireDigit = false;
                x.Password.RequireLowercase = false;

                x.User.RequireUniqueEmail = true;
            });


            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {

                x.TokenValidationParameters = new()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = config["validIssuers"],
                    ValidAudience = config["validAudience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["secret"]!))
                };
            });

            services.AddSingleton<EncryptionUtility>();
        }
    }
}

using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TestMakerFree.Data;
using Microsoft.AspNetCore.Identity;
using TestMakerFree.Data.Models;
using Microsoft.IdentityModel.Tokens;

namespace TestMakerFree
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            // Add EntityFramework support for SqlServer.
            services.AddEntityFrameworkSqlServer();

            //Add ApplicationDbContext.
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration
                    .GetConnectionString("DefaultConnection")));

            // Add ASP.NET Identity support
            services.AddIdentity<ApplicationUser, IdentityRole>(
                    opts =>
                    {
                        opts.Password.RequireDigit = true;
                        opts.Password.RequireLowercase = true;
                        opts.Password.RequireUppercase = true;
                        opts.Password.RequireNonAlphanumeric = false;
                        opts.Password.RequiredLength = 7;
                    })
                .AddEntityFrameworkStores<ApplicationDbContext>();

            // Add Authentication with JWT Tokens
            services.AddAuthentication(opts =>
                {
                    opts.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    opts.DefaultAuthenticateScheme =
                        JwtBearerDefaults.AuthenticationScheme;
                    opts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters()
                    {
                        // standard configuration
                        ValidIssuer = Configuration["Auth:Jwt:Issuer"],
                        ValidAudience = Configuration["Auth:Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(Configuration["Auth:Jwt:Key"])),
                        ClockSkew = TimeSpan.Zero,

                        // security switches
                        RequireExpirationTime = true,
                        ValidateIssuer = true,
                        ValidateIssuerSigningKey = true,
                        ValidateAudience = true
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, 
                              IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            //app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = (context) =>
                {
                    // Disable caching for all static files.
                    context.Context.Response.Headers["Cache-Control"] = 
                            Configuration["StaticFiles:Headers:Cache-Control"];
                    context.Context.Response.Headers["Pragma"] = 
                            Configuration["StaticFiles:Headers:Pragma"];
                    context.Context.Response.Headers["Expires"] = 
                            Configuration["StaticFiles:Headers:Expires"];
                }
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });

            // Create a service scope to get an ApplicationDbContext instance
           // using DI
            using (var serviceScope = app
                                  .ApplicationServices
                                  .GetRequiredService<IServiceScopeFactory>()
                                  .CreateScope())
            {
                var dbContext = serviceScope
                                .ServiceProvider
                                .GetService<ApplicationDbContext>();
                //provide our DbSeeder class with a UserManager and a
                //RoleManager, as they are the required Microsoft.AspNetCore.
                //Identity handler classes to properly work with users and roles.
                var roleManager = serviceScope
                                 .ServiceProvider
                                 .GetService<RoleManager<IdentityRole>>();
                var userManager = serviceScope
                                  .ServiceProvider
                                  .GetService<UserManager<ApplicationUser>>();
                // Create the Db if it doesn't exist and applies
                // any pending migration.
                dbContext.Database.Migrate();
                // Seed the Db.
                DbSeeder.Seed(dbContext, roleManager, userManager);
            }

            // Add the AuthenticationMiddleware to the pipeline
            app.UseAuthentication();
        }
    }
}

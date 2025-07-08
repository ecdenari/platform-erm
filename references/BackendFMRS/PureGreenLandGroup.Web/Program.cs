using Microsoft.AspNetCore.Authentication.Cookies;
using PureGreenLandGroup.Services.IServices;
using PureGreenLandGroup.Services.Services;

try
{

    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    builder.Services.AddControllersWithViews();

    // Add services to the container.
    builder.Services.AddControllersWithViews();
    //builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
    builder.Services.AddScoped<IEmailService, EmailService>();

    // Configure session options
    builder.Services.AddSession(options =>
    {
        options.IdleTimeout = TimeSpan.FromMinutes(30); // Set session timeout
    });

    builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
           .AddCookie(options =>
           {
               options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
               options.SlidingExpiration = true;
               options.AccessDeniedPath = "/Account/AccessDenied";
               options.LoginPath = "/Account/Login";
           });

    builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (!app.Environment.IsDevelopment())
    {
        app.UseExceptionHandler("/Home/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.UseSession();
    app.UseRouting();
    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Account}/{action=Login}/{id?}");

    app.Run();
}
catch (Exception)
{
    throw;
}

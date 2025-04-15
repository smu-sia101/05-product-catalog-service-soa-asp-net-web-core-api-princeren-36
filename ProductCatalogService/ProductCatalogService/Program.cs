using ProductCatalogService.Services;
using ProductCatalogService.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.Configure<ProductCatalogDB>(
    builder.Configuration.GetSection("ProductCatalogDB"));

builder.Services.AddSingleton<ProductService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.UseCors("AllowAll");

app.MapControllers();

app.Run();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//jack - begin
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "CorsPolicy",
        builder => builder
            .WithOrigins("http://localhost:5029")   //Use the port your webapp is running on!
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
    );
});
//jack - end

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();  //Commented out by Jack

app.UseCors("CorsPolicy"); //Added by Jack

app.UseAuthorization();

app.MapControllers();

app.Run();

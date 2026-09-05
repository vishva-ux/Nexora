FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["Nexora.Api/Nexora.Api.csproj", "Nexora.Api/"]
COPY ["Nexora.Application/Nexora.Application.csproj", "Nexora.Application/"]
COPY ["Nexora.Domain/Nexora.Domain.csproj", "Nexora.Domain/"]
COPY ["Nexora.Infrastructure/Nexora.Infrastructure.csproj", "Nexora.Infrastructure/"]
RUN dotnet restore "Nexora.Api/Nexora.Api.csproj"
COPY . .
WORKDIR "/src/Nexora.Api"
RUN dotnet build "Nexora.Api.csproj" -c Release -o /app/build
RUN dotnet publish "Nexora.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "Nexora.Api.dll"]

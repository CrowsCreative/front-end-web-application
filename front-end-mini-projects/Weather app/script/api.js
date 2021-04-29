class AccuWeatherApi{

    constructor()
    {
        this.key = "DagQcU31FWBG4txlh3ev7xvIUvKGcLdb";
        this.weatherURL= "http://dataservice.accuweather.com/currentconditions/v1/"
        this.cityURL = "http://dataservice.accuweather.com/locations/v1/cities/search"
    }
    
    async updateCity(city)
    {
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);
    return { cityDetails, weather };
    }
    //get city information
    async getCity(city)
    {
    
    const query= `?apikey=${this.key}&q=${city}`
    const response = await fetch(this.cityURL + query);
    if(!(response.status === 200))
    {
        throw new Error("cannot fetch data");
    }
    const data = await response.json();
    return data[0];
    }


    async getWeather(id)
   {
    
    const query= `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatherURL + query);
    if(!(response.status === 200))
    {
        throw new Error("cannot fetch data");
    }
    const data = await response.json();
    return data[0];
  };


}

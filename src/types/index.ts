export type optionType = {
  name?: string
  country?: string
  state?: string
  temp?: number
  lat: number
  lon: number
}

export type forecastType = {
  city: {
    coord: {
      lat: number
      lon: number
    }
    country: string
    name: string
    sunrise: number
    sunset: number
    timezone: number
  }
  list: [
    {
      clouds: {
        all: number
      }
      dt: number
      dt_txt: string
      main: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_max: number
        temp_min: number
      }
      pop: number
      visibility: number
      weather: [
        {
          description: string
          icon: string
          id: number
          main: string
        }
      ]
      wind: {
        speed: number
        gust: number
        deg: number
      }
    }
  ]
  sunrise: number
  sunset: number
}

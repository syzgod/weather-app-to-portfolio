import { forecastType } from '../types'
import {
  WiDirectionUp,
  WiDirectionDown,
  WiThermometer,
  WiHumidity,
  WiBarometer,
  WiUmbrella,
} from 'react-icons/wi'
import { FiSunrise, FiSunset } from 'react-icons/fi'
import { SiWindicss } from 'react-icons/si'
import InfoTile from './InfoTile'
import {
  getFormattedTime,
  getWindDirection,
  getHumidityValue,
  getPop,
} from '../helpers'

type Props = {
  data: forecastType
}

const Forecast = ({ data }: Props): JSX.Element => {
  const today = data.list[0]

  const iconURL = `http://openweathermap.org/img/wn/`

  return (
    <div className="flex min-h-fit max-w-[640px] flex-col items-center justify-center rounded-xl bg-white bg-opacity-20 p-4 text-center text-zinc-700 drop-shadow-lg backdrop-blur-lg md:w-[750px]">
      <section className="text-center">
        <h2 className="flex items-center justify-center text-4xl font-black">
          {data.city.name}
          <div className="flex flex-row items-center justify-center">
            <span className="ml-2 text-2xl font-thin">{data.city.country}</span>
            <img
              src={`https://openweathermap.org/images/flags/${data.city.country.toLowerCase()}.png`}
              alt={`${data.city.country}-flag`}
              className="ml-1 mb-3 inline-block h-3"
            />
          </div>
        </h2>
        <span className="block text-sm font-thin">
          (Lat: {data.city.coord.lat.toFixed(3)}, Lon:{' '}
          {data.city.coord.lon.toFixed(3)})
        </span>
        <div className="flex flex-row items-center justify-center">
          <h1 className="text-7xl">{Math.round(today.main.temp)}°</h1>
          <div className="flex flex-col">
            <img
              src={`${iconURL}${today.weather[0].icon}@2x.png`}
              alt={`${today.weather[0].main.toLowerCase()}-weather-icon`}
              className="inline-block"
            />
            <p className="-mt-4 capitalize">{today.weather[0].description}</p>
          </div>
          <div className="flex flex-col">
            <span className="flex items-center justify-center">
              <WiDirectionUp className="inline-block" size={30} />
              H: {Math.ceil(today.main.temp_max)}°
            </span>
            <span>
              <WiDirectionDown className="inline-block" size={30} />
              L: {Math.floor(today.main.temp_min)}°
            </span>
          </div>
        </div>
      </section>

      {/* Forecast every 3 hours */}
      <section className="backdrop-blur-ls mt-10 mb-5 flex w-[350px] justify-start overflow-x-scroll rounded bg-white/20 pb-2 sm:w-[600px]">
        {data.list.map((item, i) => (
          <div
            key={i}
            className="mt-2 inline-block w-[50px] flex-shrink-0 border-r-2 border-zinc-100 text-center last:border-0"
          >
            <p className="text-sm">
              {i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}
            </p>
            <img
              alt={`weather-icon-${item.weather[0].description}`}
              src={`${iconURL}${item.weather[0].icon}@2x.png`}
            />
            <p className="text-sm font-bold">{Math.round(item.main.temp)}°</p>
          </div>
        ))}
      </section>

      {/* Info Tiles */}
      <div className="m-2 flex w-fit flex-wrap items-center justify-center gap-2">
        <section className="backdrop-blur-ls flex h-[130px] w-[150px] flex-col items-center justify-center rounded-xl bg-white/20 text-xs font-bold drop-shadow-lg">
          <div className="flex">
            <FiSunrise size={25} />{' '}
            <span className="ml-1 text-xl">
              {getFormattedTime(data.city.sunrise)}
            </span>
          </div>
          <div className="flex">
            <FiSunset size={25} />{' '}
            <span className="ml-1 text-xl">
              {getFormattedTime(data.city.sunset)}
            </span>
          </div>
        </section>

        <InfoTile
          icon={<WiThermometer size={30} />}
          info={`${Math.round(today.main.feels_like)}°`}
          description={`Feels ${
            Math.round(today.main.feels_like) < Math.round(today.main.temp)
              ? 'colder'
              : 'warmer'
          }`}
          title="Feels like"
        />
        <InfoTile
          icon={<SiWindicss size={20} />}
          info={`${Math.ceil(today.wind.speed)} m/s`}
          description={`${getWindDirection(
            Math.ceil(today.wind.deg)
          )}, gusts ${Math.ceil(today.wind.gust)} m/s`}
          title="Wind"
          special="mr-2"
        />
        <InfoTile
          icon={<WiUmbrella size={30} />}
          info={`${Math.round(today.pop * 1000)}%`}
          description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
          title="Precipitation"
        />
        <InfoTile
          icon={<WiHumidity size={30} />}
          info={`${today.main.humidity}%`}
          description={getHumidityValue(today.main.humidity)}
          title="Humidity"
        />
        <InfoTile
          icon={<WiBarometer size={30} />}
          info={`${today.main.pressure} hPa`}
          description={`${
            Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher '
          }`}
          title="Pressure"
        />
      </div>
    </div>
  )
}

export default Forecast

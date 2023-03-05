import { forecastType } from '../types'
import { WiDirectionUp, WiDirectionDown } from 'react-icons/wi'
import { FiSunrise, FiSunset } from 'react-icons/fi'
import { getSunTime } from '../helpers'

type forecastProps = {
  data: forecastType
}

const Forecast = ({ data }: forecastProps): JSX.Element => {
  const today = data.list[0]

  const iconURL = `http://openweathermap.org/img/wn/`

  return (
    <div className="my-2 flex h-full flex-col items-center justify-center rounded bg-white bg-opacity-20 p-4 text-center text-zinc-700 drop-shadow-lg backdrop-blur-lg md:max-w-[500px] md:px-10 lg:ml-1 lg:h-[500px] lg:p-10">
      <div className="mx-auto max-w-[450px]">
        <section className="text-center">
          <h2 className="flex items-center justify-center text-4xl font-black">
            {data.city.name}
            <div className="flex flex-row">
              <span className="text-2xl font-thin"> {data.city.country}</span>
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
                <WiDirectionUp className="inline-block" size={25} />
                H: {Math.ceil(today.main.temp_max)}°
              </span>
              <span>
                <WiDirectionDown className="inline-block" size={25} />
                L: {Math.floor(today.main.temp_min)}°
              </span>
            </div>
          </div>
        </section>
        <section className="backdrop-blur-ls mt-10 mb-5 flex overflow-x-scroll rounded bg-white/20 pb-2">
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
        <section className="flex flex-wrap justify-between text-zinc-700">
          <div className="backdrop-blur-ls mb-5 flex w-[140px] flex-row items-center justify-center rounded bg-white/20 py-4 text-xs font-bold drop-shadow-lg">
            <FiSunrise />{' '}
            <span className="ml-1 mr-2">{getSunTime(data.city.sunrise)}</span>
            <FiSunset />{' '}
            <span className="ml-1">{getSunTime(data.city.sunset)}</span>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Forecast

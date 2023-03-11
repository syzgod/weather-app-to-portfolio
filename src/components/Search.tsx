import { optionType } from '../types'
import { ChangeEvent } from 'react'
import { MdLocationPin } from 'react-icons/md'

type Props = {
  searchInput: string
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  options: []
  onLocationSelect: (option: optionType) => void
  onUnitSubmit: (value: 'metric' | 'imperial') => void
  handleLocationClick: () => void
  unit: 'metric' | 'imperial'
}

const Search = ({
  searchInput,
  onInputChange,
  options,
  onLocationSelect,
  onUnitSubmit,
  handleLocationClick,
  unit,
}: Props): JSX.Element => {
  return (
    <section className="z-50 mb-3 mt-3 flex h-full max-w-[360px] flex-col items-center justify-center rounded-xl bg-white bg-opacity-20 p-4 text-center text-zinc-700 drop-shadow-lg backdrop-blur-lg md:max-w-[500px]">
      {/* Title */}
      <h1 className="text-6xl font-thin">
        Weather <span className="font-black">Forecast</span>
      </h1>
      <p className="mt-10">
        Type the location you are looking for and select from the dropdown then
        press Search
      </p>
      <div className="relative m-4 flex flex-row items-center justify-center ">
        <div className="mr-2 flex justify-center">
          {/* Search input */}
          <input
            type="text"
            value={searchInput}
            className="w-full rounded-l-md border-2 border-white px-2 py-1"
            onChange={onInputChange}
          />
          <button
            className="cursor-pointer rounded-r-md border-2 border-zinc-100 py-1 px-1 text-zinc-100 hover:border-zinc-700 hover:text-zinc-700"
            onClick={() => onUnitSubmit('metric')}
          >
            search
          </button>
        </div>
        <div className="ml-4 flex w-1/4 flex-row items-center justify-center">
          <button>
            <MdLocationPin
              size={25}
              className="ml-1 text-gray-200 transition ease-out hover:scale-150"
              onClick={handleLocationClick}
            />
          </button>
          <p className="mx-2 text-2xl text-gray-200">|</p>
          <button
            className={`text-2xl text-gray-200 transition ease-out hover:scale-150 ${
              unit === 'metric' ? ' text-zinc-700' : ''
            }`}
            onClick={() => onUnitSubmit('metric')}
          >
            C°
          </button>
          <p className="mx-2 text-2xl text-gray-200">|</p>
          <button
            className={`text-2xl text-gray-200 transition ease-out hover:scale-150 ${
              unit === 'imperial' ? ' text-zinc-700' : ''
            }`}
            onClick={() => onUnitSubmit('imperial')}
          >
            F°
          </button>
        </div>
        {/* Search results after API call */}
        <ul className="absolute top-9 left-1.5 overflow-hidden rounded-md bg-white">
          {options.length > 0 &&
            options.map((option: optionType, index) => (
              <li
                key={option.name + '-' + index}
                className="flex justify-between sm:w-80 md:w-96 "
              >
                <button
                  className="flex w-full cursor-pointer items-center justify-between border-b border-b-zinc-700/20 px-3 py-1 text-left text-sm hover:bg-zinc-700 hover:text-white"
                  onClick={() => onLocationSelect(option)}
                >
                  <div className="flex">
                    <div>
                      <span className="font-bold">{option.name}</span>,{' '}
                      <span className="text-xs font-thin">{option.state}</span>{' '}
                      <span className="font-bold">{option.country}</span>
                      <img
                        src={`https://openweathermap.org/images/flags/${option.country!.toLowerCase()}.png`}
                        alt={`${option.country}-flag`}
                        className="ml-1 mr-2 inline-block"
                      />
                    </div>
                  </div>
                  <span className="ml-2 flex flex-shrink-0 text-right text-xs font-normal">
                    {option.lat.toFixed(3)}, {option.lon.toFixed(3)}
                  </span>
                </button>
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}

export default Search

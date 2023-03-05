import { optionType } from '../types'
import { ChangeEvent } from 'react'

type Props = {
  searchInput: string
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  options: []
  onLocationSelect: (option: optionType) => void
  onSubmit: () => void
}

const Search = ({
  searchInput,
  onInputChange,
  options,
  onLocationSelect,
  onSubmit,
}: Props): JSX.Element => {
  return (
    <section className="z-50 flex h-full flex-col items-center justify-center rounded bg-white bg-opacity-20 p-4 text-center text-zinc-700 drop-shadow-lg backdrop-blur-lg md:max-w-[500px] md:px-10 lg:h-[500px] lg:p-24">
      <h1 className="text-6xl font-thin">
        Weather <span className="font-black">Forecast</span>
      </h1>
      <p className="mt-10">
        Type the location you are looking for and select from the dropdown
      </p>
      <div className="relative mt-4 flex md:mt-4">
        <input
          type="text"
          value={searchInput}
          className="w-96 rounded-l-md border-2 border-white px-2 py-1"
          onChange={onInputChange}
        />
        <ul className="absolute top-9 ml-1 rounded-b-md bg-white">
          {options.map((option: optionType, index) => (
            <li key={option.name + '-' + index}>
              <button
                className="flex min-w-[23.8rem] cursor-pointer items-center justify-between px-2 py-1 text-left text-sm hover:bg-zinc-700 hover:text-white"
                onClick={() => onLocationSelect(option)}
              >
                <div>
                  {option.name},{' '}
                  <span className="font-thin">{option.state}</span>{' '}
                  <span className="font-bold">{option.country}</span>
                  <img
                    src={`https://openweathermap.org/images/flags/${option.country.toLowerCase()}.png`}
                    alt={`${option.country}-flag`}
                    className="ml-1 inline-block"
                  />
                  <div>{option.temp}</div>
                </div>
                <span className="ml-10 text-xs font-normal">
                  {option.lat.toFixed(3)}, {option.lon.toFixed(3)}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <button
          className="cursor-pointer rounded-r-md border-2 border-zinc-100 py-1 px-1 text-zinc-100 hover:border-zinc-700 hover:text-zinc-700"
          onClick={onSubmit}
        >
          search
        </button>
      </div>
    </section>
  )
}

export default Search

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
    <section className="z-50 mb-3 flex min-h-fit max-w-[640px] flex-col items-center justify-center rounded-xl bg-white bg-opacity-20 p-4 text-center text-zinc-700 drop-shadow-lg backdrop-blur-lg md:w-[750px]">
      {/* Title */}
      <h1 className="text-6xl font-thin">
        Weather <span className="font-black">Forecast</span>
      </h1>
      <p className="mt-10">
        Type the location you are looking for and select from the dropdown then
        press Search
      </p>
      <div className="relative mt-4 flex justify-center md:mt-4">
        {/* Search input */}
        <input
          type="text"
          value={searchInput}
          className="min-w-full rounded-l-md border-2 border-white px-2 py-1"
          onChange={onInputChange}
        />
        {/* Search results after API call */}
        <ul className="absolute top-9 -left-7 overflow-hidden rounded-md bg-white">
          {options.map((option: optionType, index) => (
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
                      src={`https://openweathermap.org/images/flags/${option.country.toLowerCase()}.png`}
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

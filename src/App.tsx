import Search from './components/Search'
import Forecast from './components/Forecast'
import useForecast from './hooks/useForecast'
import ForecastChart from './components/ForecastChart'

function App(): JSX.Element {
  const {
    searchInput,
    options,
    forecast,
    onInputChange,
    onLocationSelect,
    onUnitSubmit,
    handleLocationClick,
    unit,
  } = useForecast()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 overflow-scroll bg-gradient-to-br from-sky-400 via-rose-400 to-blue-700 lg:flex-row ">
      <div className="flex flex-col items-center justify-center">
        <Search
          searchInput={searchInput}
          options={options}
          onInputChange={onInputChange}
          onLocationSelect={onLocationSelect}
          onUnitSubmit={onUnitSubmit}
          handleLocationClick={handleLocationClick}
          unit={unit}
        />
        {forecast && <ForecastChart data={forecast} />}
      </div>
      {forecast && <Forecast data={forecast} unit={unit} />}
    </main>
  )
}

export default App

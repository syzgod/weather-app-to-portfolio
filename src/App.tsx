import Search from './components/Search'
import Forecast from './components/Forecast'
import useForecast from './hooks/useForecast'

function App(): JSX.Element {
  const {
    searchInput,
    options,
    forecast,
    onInputChange,
    onLocationSelect,
    onSubmit,
    onSystemSelect,
  } = useForecast()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 overflow-scroll bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 lg:flex-row ">
      <Search
        searchInput={searchInput}
        options={options}
        onInputChange={onInputChange}
        onLocationSelect={onLocationSelect}
        onSubmit={onSubmit}
        onSystemSelect={onSystemSelect}
      />
      {forecast && <Forecast data={forecast} />}
    </main>
  )
}

export default App

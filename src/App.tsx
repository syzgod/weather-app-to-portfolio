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
  } = useForecast()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 lg:flex-row">
      <Search
        searchInput={searchInput}
        options={options}
        onInputChange={onInputChange}
        onLocationSelect={onLocationSelect}
        onSubmit={onSubmit}
      />
      {forecast && (
        <div>
          <Forecast data={forecast} />
        </div>
      )}
    </main>
  )
}

export default App

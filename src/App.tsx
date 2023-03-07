import Search from './components/Search'
import Forecast from './components/Forecast'
import useForecast from './hooks/useForecast'
import { ToastContainer, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ForecastChart from './components/ForecastChart'

function App(): JSX.Element {
  const {
    searchInput,
    options,
    forecast,
    onInputChange,
    onLocationSelect,
    onSubmit,
    unit,
    onUnitSelect,
    handleLocationClick,
  } = useForecast()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 overflow-scroll bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 lg:flex-row ">
      <ToastContainer
        limit={4}
        transition={Flip}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <div className="flex flex-col">
        <Search
          searchInput={searchInput}
          options={options}
          onInputChange={onInputChange}
          onLocationSelect={onLocationSelect}
          onSubmit={onSubmit}
          onUnitSelect={onUnitSelect}
          handleLocationClick={handleLocationClick}
        />
        {forecast && <ForecastChart data={forecast} />}
      </div>
      {forecast && <Forecast data={forecast} unit={unit} />}
    </main>
  )
}

export default App

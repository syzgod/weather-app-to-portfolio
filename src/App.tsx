import Search from './components/Search'
import Forecast from './components/Forecast'
import useForecast from './hooks/useForecast'
import { ToastContainer, Slide, Zoom, Flip, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
      <ToastContainer
        transition={Flip}
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        limit={3}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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

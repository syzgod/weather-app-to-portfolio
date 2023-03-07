import { useState, useEffect, ChangeEvent } from 'react'
import { optionType, forecastType } from '../types'

const useForecast = () => {
  const [searchInput, setSearchInput] = useState<any>('')
  const [options, setOptions] = useState<[]>([])
  const [location, setLocation] = useState<optionType | null>(null)
  const [forecast, setForecast] = useState<forecastType | null>(null)
  const [unit, setUnit] = useState<string | null>('metric')

  //TODO Bug: Fix 'onSubmit' passing an object so 'getForecast' using wrong 'unit'
  //TODO Bug: Fix m/s => mi/h conversion at wind speed when changing from 'metric' to 'imperial'
  //TODO Bug: Fix having to double click on buttons to get the API call
  //TODO Feature: Add color indicator if any of the values are too high/low
  //TODO Feature: Add 'toastify' and setup properly to not overcrowd the screen
  //TODO Feature: Implement 'chart' for temperature
  //TODO Feature: Add indicator which unit(C/F) is active

  {
    /* API call for multiple locations with the same name from search input */
  }
  const getSearchValue = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((err) => {
        alert(`Something went wrong, try again. ${err.message}`)
      })
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value)

    if (value === '' || value.trim() === '') return

    getSearchValue(value)
  }

  {
    /* Get forecast from the API using latitude and longitude */
  }
  const getForecast = (location: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${process.env.REACT_APP_API_KEY}&units=${unit}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data,
          list: data.list.slice(0, 16),
        }
        setForecast(forecastData)
        console.log(forecastData)
      })
      .catch((err) => {
        alert(`Something went wrong, try again. ${err.message}`)
      })
  }

  {
    /* Submit unit change or call user's location  */
  }

  const onSubmit = (unit: string | null) => {
    if (!location) return
    console.log(unit)
    setUnit(unit)
    setSearchInput('')

    getForecast(location)
  }

  {
    /* Handle selected location from the options list*/
  }

  const onLocationSelect = (option: optionType) => {
    setLocation(option)
  }

  {
    /* Get the units(metric, imperial) from the buttons we choose */
  }

  const onUnitSelect = (value: string) => {
    console.log(value)
    setUnit(value)
  }

  {
    /* Get the user's location if clicked on the icon/button */
  }
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
      const success = (pos: any) => {
        const { latitude: lat, longitude: lon } = pos.coords
        console.log(lat, lon)

        setLocation({ lat, lon })
        getForecast({ lat, lon })
      }

      const error = (err: any) => {
        console.warn(`ERROR(${err.code}): ${err.message}`)
      }

      navigator.geolocation.getCurrentPosition(success, error, options)
    }
  }

  useEffect(() => {
    if (location) {
      setSearchInput(location.name)
      setOptions([])
    }
  }, [location])

  return {
    searchInput,
    options,
    forecast,
    onInputChange,
    onLocationSelect,
    onSubmit,
    unit,
    onUnitSelect,
    handleLocationClick,
  }
}

export default useForecast

import { useState, useEffect, ChangeEvent } from 'react'
import { optionType, forecastType } from '../types'

const useForecast = () => {
  const REACT_APP_API_KEY = 'd5bb22a0a83465db34afc639b332703c'

  const [searchInput, setSearchInput] = useState<any>('')
  const [options, setOptions] = useState<[]>([])
  const [location, setLocation] = useState<optionType>({} as optionType)
  const [forecast, setForecast] = useState<forecastType | null>(null)
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')

  //TODO Bug: Fix 'onUnitSubmit' passing an object so 'getForecast' using wrong 'unit'
  //TODO Bug: Fix m/s => mi/h conversion at wind speed when changing from 'metric' to 'imperial'
  //TODO Feature: Add 'toastify' and setup properly to not overcrowd the screen
  //TODO Feature: Extend 'chart' for temperature

  {
    /* API call for multiple locations with the same name from search input */
  }
  const getSearchValue = (value: string) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${REACT_APP_API_KEY}`
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
  const getForecast = (location: optionType, unit: 'metric' | 'imperial') => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${REACT_APP_API_KEY}&units=${unit}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data,
          list: data.list.slice(0, 16),
        }
        setForecast(forecastData)
      })
      .catch((err) => {
        alert(`Something went wrong, try again. ${err.message}`)
      })
  }

  {
    /* Submit unit change or call user's location  */
  }

  const onUnitSubmit = (value: 'metric' | 'imperial' = 'metric') => {
    if (!location) return
    setUnit(value)
    setSearchInput('')
    getForecast(location, value)
  }

  {
    /* Handle selected location from the options list*/
  }

  const onLocationSelect = (option: optionType) => {
    setLocation(option)
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

        setLocation({ lat, lon })
        getForecast({ lat, lon }, unit)
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
    onUnitSubmit,
    unit,
    handleLocationClick,
  }
}

export default useForecast

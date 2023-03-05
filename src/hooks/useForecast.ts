import { useState, useEffect, ChangeEvent } from 'react'
import { optionType, forecastType } from '../types'

const useForecast = () => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [options, setOptions] = useState<[]>([])
  const [location, setLocation] = useState<optionType | null>(null)
  const [forecast, setForecast] = useState<forecastType | null>(null)

  const getSearchValue = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setSearchInput(value)

    if (value === '') return

    getSearchValue(value)
  }

  const getForecast = (location: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data,
          list: data.list.slice(0, 16),
        }
        setForecast(forecastData)
      })
  }

  const onSubmit = () => {
    if (!location) return

    getForecast(location)
  }

  const onLocationSelect = (option: optionType) => {
    setLocation(option)
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
  }
}

export default useForecast

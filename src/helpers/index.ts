export const getWindDirection = (wind: number) => {
  let deg: number | string = wind
  switch (true) {
    case deg >= 360 && deg <= 21:
      deg = 'N'
      break
    case deg >= 22 && deg <= 44:
      deg = 'NNE'
      break
    case deg >= 45 && deg <= 66:
      deg = 'NE'
      break
    case deg >= 67 && deg <= 89:
      deg = 'ENE'
      break
    case deg >= 90 && deg <= 111:
      deg = 'E'
      break
    case deg >= 112 && deg <= 134:
      deg = 'ESE'
      break
    case deg >= 135 && deg <= 156:
      deg = 'SE'
      break
    case deg >= 157 && deg <= 179:
      deg = 'SSE'
      break
    case deg >= 180 && deg <= 201:
      deg = 'S'
      break
    case deg >= 202 && deg <= 224:
      deg = 'SSW'
      break
    case deg >= 225 && deg <= 246:
      deg = 'SW'
      break
    case deg >= 247 && deg <= 269:
      deg = 'WSW'
      break
    case deg >= 270 && deg <= 291:
      deg = 'W'
      break
    case deg >= 292 && deg <= 314:
      deg = 'WNW'
      break
    case deg >= 315 && deg <= 336:
      deg = 'NW'
      break
    case deg >= 337 && deg <= 359:
      deg = 'NNW'
      break
    default:
      deg = 'no data'
  }
  return deg
}

export const getHumidityValue = (level: number): string => {
  if (level <= 55) return 'Dry and comfortable'
  if (level > 55 && level <= 65) return 'A bit uncomfortable, sticky feeling'

  return 'Lots of moisture, uncomfortable air'
}

export const getVisibilityValue = (number: number): string => {
  if (number <= 50) return 'Dangerously foggy'
  if (number > 50 && number <= 500) return 'Expect heavy fog'
  if (number > 500 && number <= 2000) return 'Expect some fog'
  if (number > 2000 && number <= 9000) return 'Expect some haze'

  return 'Very clear day'
}

export const getFormattedTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  let hours = date.getHours().toString()
  let minutes = date.getMinutes().toString()

  if (hours.length <= 1) hours = `0${hours}`
  if (minutes.length <= 1) minutes = `0${minutes}`

  return `${hours}:${minutes}`
}

export const getPop = (value: number): string => {
  if (value <= 0.33) return 'Low probability'
  if (value > 0.33 && value <= 0.66) return 'Moderate probability'

  return 'High probability'
}

const request = require('postman-request')

const urlCuaca =
  'https://api.weatherstack.com/current?access_key=de7267a99e4adfc0e532ffb2be6c3910&query=-0.8972385620691905,%20100.35062723337701'

request({ url: urlCuaca, json: true }, (error, response) => {
  if (error) {
    return console.log('Gagal konek:', error)
  }
  if (response.body && response.body.error) {
    return console.log('Error API:', response.body.error.info)
  }
  console.log(
    'Saat ini suhu diluar mencapai ' +
      response.body.current.temperature +
      '°C. Kemungkinan terjadinya hujan adalah ' +
      response.body.current.precip +
      '%'
  )
  console.log(
  'Cuaca: ' + response.body.current.weather_descriptions[0]
  )
})

const geocodeURL =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/Universitas Negeri Padang.json?access_token=pk.eyJ1IjoiYXBpaXAiLCJhIjoiY21oMWNuZG90MHI1bWowcTFheXR6Mnk4diJ9.6F3GeNH3nP50nkAyLXgpGg&limit=3'

request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    return console.log('Gagal konek ke Mapbox:', error)
  }
  if (!response.body.features || response.body.features.length === 0) {
    return console.log('Lokasi tidak ditemukan. Coba nama yang lebih spesifik.')
  }

  const latitude = response.body.features[0].center[1]
  const longitude = response.body.features[0].center[0]
  console.log( longitude , latitude)
})


const request = require('postman-request')

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXBpaXAiLCJhIjoiY21oMWNuZG90MHI1bWowcTFheXR6Mnk4diJ9.6F3GeNH3nP50nkAyLXgpGg'
const WEATHERSTACK_KEY = 'de7267a99e4adfc0e532ffb2be6c3910'
const lokasi = 'Koto Tangah' // bisa ubah misalnya 'Universitas Negeri Padang'

const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
  lokasi
)}.json?access_token=${MAPBOX_TOKEN}&limit=1`

request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) return console.log('Tidak dapat terhubung ke Mapbox:', error)

  const dataMap = response.body.features[0]
  const latitude = dataMap.center[1]
  const longitude = dataMap.center[0]
  const placeName = dataMap.place_name
  const placeType = dataMap.place_type[0]

  console.log(`Koordinat lokasi anda adalah ${latitude}, ${longitude}`)
  console.log(`Data yang anda cari adalah: ${lokasi}`)
  console.log(`Data yang ditemukan adalah: ${placeName}`)
  console.log(`Tipe lokasi adalah: ${placeType}`)

  const weatherURL = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${latitude},${longitude}&units=m`

  request({ url: weatherURL, json: true }, (error, response) => {
    if (error) return console.log('Tidak dapat terhubung ke Weatherstack:', error)
    const weather = response.body.current
    console.log(
      `Saat ini suhu di ${lokasi} mencapai ${weather.temperature} derajat celcius.`
    )
    console.log(`Kemungkinan terjadinya hujan adalah ${weather.precip}%`)
  })
})

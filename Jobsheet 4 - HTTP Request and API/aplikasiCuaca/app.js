const request = require('postman-request')

const url =
  'http://api.weatherstack.com/current?access_key=de7267a99e4adfc0e532ffb2be6c3910&query=-0.8972385620691905,%20100.35062723337701'

request({ url: url }, (error, response) => {
  //console.log(response)
  const data = JSON.parse(response.body)
  console.log(data)
  //console.log(data.current)
  //console.log(data.current.temperature)
})


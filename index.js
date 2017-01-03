const fs = require('fs')
const https = require('https')

try {
  const data = fs.readFileSync('application.json', 'UTF-8')
  const jsonData  = JSON.parse(data)
  
  https.get(jsonData.home, (res) => {
    const firstParam = res.headers['set-cookie'][0].split(';')[0].split('=')[1]
    const secondParam = res.headers['set-cookie'][1].split(';')[0].split('=')[1]
    const thirdParam = res.headers['set-cookie'][2].split(';')[0].split('=')[1]

    console.log(thirdParam)
  })

} catch(e) {
  console.log(`Error : ${e.stack}`)
}

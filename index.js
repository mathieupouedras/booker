const fs = require('fs')
const https = require('https')
const FormData = require('form-data')

function login(parameters) {
  const form = new FormData()
  form.append('username', parameters.username1)
  form.append('password', parameters.password1)
  form.append(parameters.organizationIdentifierName, parameters.organizationIdentifierValue)

  const options = {
  	hostname: parameters.hostname,
  	path: parameters.loginPath,
  	method: 'POST',
  	headers: form.getHeaders()
  }

  const request = https.request(options, (res) => {
  	console.log(`statusCode: ${res.statusCode}`)
  	// Lister les cookies et prendre celui que je veux
  	console.log(res.headers['set-cookie'][1].split(';')[0].split('=')[1])

  	res.on('data', (d) => {
			process.stdout.write(d)
  	})
  })

  form.pipe(request)

  request.on('error', (e) => {
  	console.error(e)
  })

  request.end()
}

try {
  const data = fs.readFileSync('application.json', 'UTF-8')
  const jsonData  = JSON.parse(data)

  login(jsonData)

} catch(e) {
  console.log(`Error : ${e.stack}`)
}

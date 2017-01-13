const fs = require('fs')
const Services = require('./services.js')
const FormData = require('form-data')

try {
  const data = fs.readFileSync('application.json', 'UTF-8')
  const parameters  = JSON.parse(data)

  const options = {}
  options.hostname = parameters.hostname
  options.path = parameters.homePath
  options.method = 'GET'

  const form = new FormData()
  form.append('username', parameters.username1)
  form.append('password', parameters.password1)
  form.append(parameters.organizationIdentifierName, parameters.organizationIdentifierValue)

  Services.getResponseHeaders(options).then((headers) => {
    let cookies = Services.getCookies(headers)

    // login
    options.path = parameters.loginPath
    options.method = 'POST'

    Services.getResponseHeaders(options, form).then((headers) => {
      console.log(cookies)
      cookies = Services.getCookies(headers)

      console.log(cookies)      
    })

  }) 

} catch(e) {
  console.log(`Error : ${e.stack}`)
}

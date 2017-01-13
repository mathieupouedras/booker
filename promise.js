const fs = require('fs')
const https = require('https')
const FormData = require('form-data')

const getContent = function(parameters) {
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

  return new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode));
       }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', () => {});
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(response.headers['set-cookie']));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))

    request.end()
    })
};

try { 
  const data = fs.readFileSync('application.json', 'UTF-8')
  const jsonData  = JSON.parse(data)

  getContent(jsonData).then((html) => console.log(html))
                                    .catch((err) => console.error(err))
} catch(e) {
  console.error(`Error : ${e.stack}`)
}
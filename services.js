const https = require('https')
const cookie = require('cookie');

var exports = module.exports = {}

exports.getResponseHeaders = function(httpOptions, formData) {

  if (formData) {
    httpOptions.headers = formData.getHeaders()
  }

  return new Promise((resolve, reject) => {
    const request = https.request(httpOptions, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode));
       }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', () => {});
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(response.headers));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))

    request.end()
    })
}

exports.getCookies = function(headers) {
  cookies = {}
  headers['set-cookie'].forEach((element) => {
      cookies = Object.assign(cookies, cookie.parse(element))
  })

  return cookies
}

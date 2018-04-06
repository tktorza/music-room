import request from 'superagent'

let serverUrl = ''
if (process.env.NODE_ENV === 'production') { serverUrl = 'https://api.gringox.com' } else { serverUrl = 'http://localhost:8080' }

export function callApi (endpoint, method = 'get', body, psw) {

  return new Promise((resolve, reject) => {
    Expo.SecureStore.getItemAsync('token', {}).then(token => {

      if (method === 'post') {
        request.post(`${serverUrl}/${endpoint}`)
          .send(body)
          .set('Accept', 'application/json')
          .set('X-Access-Token', token || '')
          .then((res) => { const body = JSON.parse(res.text); return resolve(body) })
          .catch(e => {
            return reject(e.response.body.message || e.message)
          })
      }
      if (method === 'get') {
        return request.get(`${serverUrl}/${endpoint}`)
          .set('Accept', 'application/json')
          .set('X-Access-Token', token || '')
          .set('X-Pass', psw)
          .then((res) => {
            const body = JSON.parse(res.text); return resolve(body)
          })
          .catch(e => {
            return reject(e.response.body.message || e.message)
          })
      }

      if (method === 'put') {
        request.put(`${serverUrl}/${endpoint}`)
          .send(body)
          .set('Accept', 'application/json')
          .set('X-Access-Token', token || '')
          .then((res) => { const body = JSON.parse(res.text); return resolve(body) })
          .catch(e => {
            return reject(e.response.body.message || e.message)
          })
      }
      if (method === 'delete') {
        request.delete(`${serverUrl}/${endpoint}`)
          .set('Accept', 'application/json')
          .set('X-Access-Token', token || '')
          .then(() => {
            return resolve({ message: 'Was deleted with success' })
          })
          .catch(e => {
            return reject(e.response.body.message || e.message)
          })
      }
    })
  })
}

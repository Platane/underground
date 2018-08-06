import { stringify } from 'querystring'

const safeJSONparse = s => {
  try {
    return JSON.parse(s)
  } catch (err) {
    return null
  }
}

export default (
  url: string,
  { query = {}, method = 'GET', body, headers = {} } = {}
): any =>
  fetch(`${url}?${stringify(query)}`, {
    method: method || 'GET',
    body: (body && JSON.stringify(body)) || null,
    headers: {
      ...headers,
      'content-type': (body && 'application/json') || null,
    },
  })
    .then(async res => {
      const text = await res.text()

      if (!res.ok) throw Error(`${res.status} - ${text}`)

      const o = safeJSONparse(text) || text

      if (o.errors) throw o.errors

      return o
    })
    .catch(err => {
      throw err
    })

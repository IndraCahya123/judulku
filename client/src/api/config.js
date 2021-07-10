import axios from 'axios'

export const BaseUrl = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
})

export const setAuthToken = (token) => {
  if (token) {
    BaseUrl.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete BaseUrl.defaults.headers.common['Authorization']
  }
}

import axios from 'axios'

//
const token = localStorage.getItem('token')

const request= axios.create({
  baseURL: 'http://8.217.183.57:8888',
  withCredentials: true,
  headers: {
    'Authorization': `Bearer ${token}`
  }
})


export default request

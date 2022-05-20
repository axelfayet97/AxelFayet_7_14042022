import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api/'
console.log('Token = ', axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token'))
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
// Add dynamic headers
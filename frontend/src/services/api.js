import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  timeout: 10000,
})

export const getProducts = async (search = '') => {
  const response = await api.get('/products/', {
    params: search ? { search } : {},
  })

  return response.data.products
}

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`)
  return response.data.product
}

export default api
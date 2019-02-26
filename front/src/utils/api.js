import axios from 'axios';
// import * as consts from '../config/constants';

export function getBoards(){
    return axios.get('/api/boards/')
}

// export function getProduct(id){
//     return axios.get(`/api/product/${id}`)
// }

// export function createProduct(product){
//     return axios.post('/api/product',product)
// }

// export function deleteProduct(id){
//     return axios.delete(`/api/product/${id}`)
// }

// export function updateProduct(id,product){
//     return axios.put(`/api/product/${id}`,product)
// }
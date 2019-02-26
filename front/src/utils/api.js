import axios from 'axios';
// import * as consts from '../config/constants';

export function getBoards(){
    return axios.get('/api/boards/',{headers:{
        'TOKEN':1
    }})
}

// export function getProduct(id){
//     return axios.get(`/api/product/${id}`)
// }

export function createBoard(board){
    return axios.post('/api/boards/',board,{headers: {
        'Content-Type': 'application/json',
        'TOKEN':1
    }})
}

// export function deleteProduct(id){
//     return axios.delete(`/api/product/${id}`)
// }

// export function updateProduct(id,product){
//     return axios.put(`/api/product/${id}`,product)
// }
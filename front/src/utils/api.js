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

export function createIdea(idea){
    return axios.post('/api/ideas/',idea,{headers: {
        'Content-Type': 'application/json',
        'TOKEN':1
    }})
}

export function deleteIdea(id){
    return axios.delete(`/api/ideas/${id}/`,{headers:{
        'TOKEN':1
    }})
}

export function updateIdea(id,idea){
    return axios.put(`/api/ideas/${id}/`,idea,{headers:{
        'TOKEN':1
    }})
}

// export function updateProduct(id,product){
//     return axios.put(`/api/product/${id}`,product)
// }
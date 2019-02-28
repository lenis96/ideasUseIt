import axios from 'axios';
// import * as consts from '../config/constants';

export function login(credentials){
    console.log(credentials)
    return axios.post('/api/login/',credentials)
}
export function signup(user){
    console.log(user)
    return axios.post('/api/signup/',user,{headers: {
        'Content-Type': 'multipart/form-data'
      }})
}

export function getBoards(){
    return axios.get('/api/boards/',{headers:{
        'TOKEN':localStorage.getItem('token')
    }})
}

// export function getProduct(id){
//     return axios.get(`/api/product/${id}`)
// }

export function createBoard(board){
    return axios.post('/api/boards/',board,{headers: {
        'Content-Type': 'application/json',
        'TOKEN':localStorage.getItem('token')
    }})
}

export function createIdea(idea){
    return axios.post('/api/ideas/',idea,{headers: {
        'Content-Type': 'application/json',
        'TOKEN':localStorage.getItem('token')
    }})
}

export function deleteIdea(id){
    return axios.delete(`/api/ideas/${id}/`,{headers:{
        'TOKEN':localStorage.getItem('token')
    }})
}

export function updateIdea(id,idea){
    return axios.put(`/api/ideas/${id}/`,idea,{headers:{
        'TOKEN':localStorage.getItem('token')
    }})
}

// export function updateProduct(id,product){
//     return axios.put(`/api/product/${id}`,product)
// }
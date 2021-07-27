import * as types from './actionTypes';
import axios from 'axios'

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload:users,
})

export const  loadUsers = () => {

    return function(dispatch){
        axios.get('https://jsonplaceholder.typicode.com/users').
        then((res) => {
            console.log(res.data)
            dispatch(getUsers(res.data));
        }).catch(err => {
            console.log(err)
        })
    }

}

const getTodos =( todos) => ({
    type: types.GET_TODOS,
    payload: todos,
})


export const loadTodos = () => {
    return function(dispatch){
        axios.get('https://jsonplaceholder.typicode.com/todos').
        then((res) => {
            console.log(res.data)
            dispatch(getTodos(res.data));
        }).catch(err => {
            console.log(err)
        })
    }
}
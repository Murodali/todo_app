import * as types from './actionTypes';
import axios from 'axios'

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload:users,
})

export const  loadUsers = () => {
    return function(dispatch){
        axios.get('http://localhost:8000/users').
        then((res) => {
            // console.log(res.data)
            dispatch(getUsers(res.data));
        }).catch(err => {
            console.log(err)
        })
    }

}

const getTodos = (todos) => ({
    type: types.GET_TODOS,
    payload:todos,
})

export const  loadTodos = () => {
    return function(dispatch){
        axios.get('http://localhost:5000/todos').
        then((res) => {
            // console.log(res.data)
            dispatch(getTodos(res.data));
        }).catch(err => {
            console.log(err)
        })
    }

}
const  todoDoDelete =() => ({
    type:types.DELETE_TODO
})

const userToDelete =() => ({
    type:types.DELETE_USER
})

export const deleteTodo = (id) => {
    return function(dispatch){
        axios.delete(`http://localhost:5000/todos/${id}`).
        then((res) => {
            dispatch(todoDoDelete());
            console.log(res, "deleted sucessfully ")
            dispatch(loadTodos())
        }).catch(err => {
            console.log(err,"Not deleted")
        })


        axios.delete(`http://localhost:8000/users/${id}`)
        .then((res) => {
            dispatch(userToDelete())
            console.log(res, "user deleted")
            dispatch(loadUsers())
        }).catch(err => {
            console.log(err,"user not deleted")
        })
    }
}


const  addUser =() => ({
    type:types.ADD_USER
})

const addTodo =() => ({
    type:types.ADD_TODO
})



export const addingTodo = (todo) => {
    return function(dispatch){
        axios.post(`http://localhost:5000/todos/`,todo).
        then((res) => {
            dispatch(addTodo());
            console.log(res, "added sucessfully ")
            dispatch(loadTodos())
        }).catch(err => {
            console.log(err,"Not added")
        })

    }
}

export const addingUser  = (user) => {
    return function(dispatch){
        axios.post(`http://localhost:8000/users/`,user).
        then((res) => {
            dispatch(addUser());
            console.log(res, "added sucessfully ")
            dispatch(loadUsers())
        }).catch(err => {
            console.log(err,"Not added")
        })

    }
}


const getTodo = (todo) => ({
    type: types.GET_SINGLE_TODO,
    payload: todo
})



export const getSingleTodo = (id) => {
    return function(dispatch){
        axios.get(`http://localhost:5000/todos/${id}`)
        .then((res) => {
            dispatch(getTodo(res.data))
            // console.log(res.data)
         
        }).catch(err => {
            console.log(err,"single Todo not loaded")
        })
    }
}



const getUser = (user) => ({
    type: types.GET_SINGLE_USER,
    payload: user
})

export const getSingleUser = (id) => {
    return function(dispatch){
        axios.get(`http://localhost:8000/users/${id}`)
        .then((res) => {
            dispatch(getUser(res.data))
            // console.log(res.data)
    
        }).catch(err => {
            console.log(err,"single user not loaded")
        })
    }
}


const userUpdate = () => ({
    type: types.UPDATE_USER
})

export const updateUser = (user,id) => {
    return function(dispatch){
        axios.put(`http://localhost:8000/users/${id}`,user)
        .then((res) => {
            dispatch(userUpdate())
           

        }).catch(err => {
            console.log(err,"single user not loaded")
        })
    }
}

const todoUpdate = () => ({
    type: types.UPDATE_TODO
})

export const updateTodo = (todo,id) => {
    return function(dispatch){
        axios.put(`http://localhost:5000/todos/${id}`,todo)
        .then((res) => {
            dispatch(todoUpdate())
    
        }).catch(err => {
            console.log(err,"single user not loaded")
        })
    }
}

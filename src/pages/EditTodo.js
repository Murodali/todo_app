import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {  getSingleTodo, getSingleUser, updateTodo, updateUser } from "../redux/actions/actions";
import { useHistory,useParams } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';





const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);



function EditTodo() {


//   const [completed, setCompleted] = useState(true);

  const [todoItem, setTodoItem] = useState("");

  const dispatch = useDispatch();

  let {id} = useParams();


const {user} = useSelector( state => state.users);
const { todo } = useSelector( state => state.todos);

const [checked, setChecked] = useState(false);


useEffect(() => {
    if(todo){
    //    setName(todo.name)
       setTodoItem(todo.title)
       setChecked(todo.completed)
    
    }
  }, [])

console.log(user)
console.log(todo)



  useEffect(() => {
    dispatch(getSingleTodo(id))
    dispatch(getSingleUser(id))
  }, [])

  const [err, setErr] = useState();

  const [completed, setCompleted] = useState(false);
  const [name, setName] = useState("");


  const data ={
    title:todo,
    completed: completed,
 
  }

  const userdata ={
    name: name,
  
  }




  const handleSubmit = e => {
    e.preventDefault();
    if(!name || !todo){
      setErr("Please provide all the details")
    }else{
        dispatch(updateTodo(data,todo.id));
        dispatch(updateUser(userdata,user.id));
    
        setErr("");
        // history.push('/')
        
    }

  
  }



  return (
    <div className="edit_user">
      <h1>Change the todo Iteam if you wish</h1>

      <form noValidate autoComplete="off">
        <div style={{ marginTop: "20px" }}>
          <TextField
            id="standard-basic"
            label="Name"
            style={{ width: "45ch" }}
            value={user.name || ""}
            type="text"
            onChange={(e) => setName(e.target.value)}
        
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <TextField
            id="standard-multiline-static"
            label="To do"
            multiline
            value={todo && todo.title || ""}
            rows={4}
            style={{ width: "45ch" }}
            onChange={(e) => setTodoItem(e.target.value)}
          />
        </div>

        <div className="completed">
            <h2>Completed</h2>
            <GreenCheckbox
                    checked={checked || false }
                    onChange={(e) => setChecked(e.target.checked)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
        </div>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={handleSubmit}
        
        >
          Edit 
        </Button>
      </form>
    </div>
  );
}

export default EditTodo;

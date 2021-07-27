import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useDispatch} from 'react-redux';
import { addingTodo, addingUser } from "../redux/actions/actions";
import {useHistory} from 'react-router-dom'





function AddToDo() {


  const [err, setErr] = useState();

  const [completed, setCompleted] = useState(false);
  const [name, setName] = useState("");
  const [todo, setTodo] = useState("");

  const data ={
    title:todo,
    completed: completed,
 
  }

  const userdata ={
    name: name,
  
  }


  const history = useHistory();
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault();
    if(!name || !todo){
      setErr("Please provide all the details")
    }else{
        dispatch(addingTodo(data));
        dispatch(addingUser(userdata));
    
        setErr("");
        history.push('/')
        
    }

  
  }

  return (
    <div className="AddToDo">
      <h1>Please add a to do Item</h1>

      {err && <h3 style={{color: "red"}}> {err}</h3>}

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div style={{ marginTop: "20px" }}>
          <TextField
            id="standard-basic"
            label="Name"
            style={{ width: "45ch" }}
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <TextField
            id="standard-multiline-static"
            label="To do"
            multiline
            value={todo}
            rows={4}
            style={{ width: "45ch" }}
            onChange={(e) => setTodo(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <TextField
            id="standard-basic"
            label="Completed"
            style={{ width: "45ch" }}
            defaultValue="All todos are not completed by default"
            default={completed?"":"All todos are not compelted by defaul"}
            onChange={(e) => setCompleted(completed)}
  

          />
        </div>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </form>
    </div>
  );
}

export default AddToDo;

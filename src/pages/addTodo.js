import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";



function AddToDo() {

  return (
    <div className="AddToDo">
        <h1>Please add a to do Item</h1>
      <form noValidate autoComplete="off">
          <div>
          <TextField id="standard-basic" label="Name" style={{width:"45ch"}} />
          </div>

          <div>
          <TextField id="standard-basic" label="To do" style={{width:"45ch"}} />
          </div>

          <div>
          <TextField id="standard-basic" label="Status" style={{width:"45ch"}} />
          </div>



          <Button variant="contained" color="primary" style={{marginTop:"20px"}}>Add</Button>


   


      </form>
    </div>
  );
}

export default AddToDo;

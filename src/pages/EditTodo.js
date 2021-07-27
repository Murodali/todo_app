import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleTodo,
  getSingleUser,
  updateTodo,
  updateUser,
} from "../redux/actions/actions";
import { useHistory, useParams } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function EditTodo() {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getSingleTodo(id));
    dispatch(getSingleUser(id));
  }, []);

  const { user } = useSelector((state) => state.users);
  const { todo } = useSelector((state) => state.todos);

  const [err, setErr] = useState();

  const [name, setName] = useState((user && user?.name) || "");
  const [todoItem, setTodoItem] = useState((todo && todo?.title) || "");
  const [checked, setChecked] = useState((todo && todo?.completed) || true);

  const todoData = {
    title: todoItem,
    completed: checked,
  };

  const userdata = {
    name: name,
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  const handleChangeTodo = (e) => {
    setTodoItem(e.target.value);
    console.log(todoItem);
  };

  const handleChecked = (e) => {
    setChecked(e.target.checked);
    console.log(checked);
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !todo) {
      setErr("Please provide all the details");
    } else {
      dispatch(updateTodo(todoData, todo.id));
      console.log(todoData, todo.id);
      dispatch(updateUser(userdata, user.id));
      console.log(userdata, user.id);

      setErr("");
      history.push("/");
    }
  };

  return (
    <div className="edit_user">
      <h1>Change the todo Iteam if you wish</h1>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div style={{ marginTop: "20px" }}>
          <TextField
            id="standard-basic"
            label="Name"
            style={{ width: "45ch" }}
            value={name || ""}
            type="text"
            onChange={handleNameChange}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <TextField
            id="standard-multiline-static"
            label="To do"
            multiline
            value={todoItem || ""}
            rows={4}
            style={{ width: "45ch" }}
            onChange={handleChangeTodo}
          />
        </div>

        <div className="completed">
          <h2>Completed</h2>
          <GreenCheckbox
            checked={checked || ""}
            onChange={handleChecked}
            inputProps={{ "aria-label": "primary checkbox" }}
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

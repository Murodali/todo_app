import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector, useDispatch } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  deleteTodo,
  getSingleTodo,
  loadTodos,
  loadUsers,
} from "../redux/actions/actions";
import { ButtonGroup, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { green } from "@material-ui/core/colors";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useButtonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    marginTop: 50,
    minWidth: 900,
  },
});

function Home() {
  const classes = useStyles();

  const buttonStyles = useButtonStyles();

  const { users } = useSelector((state) => state.users);
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
    dispatch(loadTodos());
  }, []);

  const usersById =
    users &&
    users.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTodo(id));
    }
  };

  let history = useHistory();

  const [searchItem, setSearchItem] = useState("");
  const [allSelected, setAllselected] = useState(true);
  const [filter, setFilter] = useState(false);
  const [todoNumber, setTodoNumber] = useState(0);

  const handleAllSelected = (e) => {
    setAllselected(e.target.checked);
    console.log(allSelected);
  
  };

  const handleFilter = (e) => {
    setFilter(e.target.checked);
    console.log(filter);
   
  };



  const [arr, setArr] = useState([]);

  return (
    <div className="home">
      <h1>This is a sample Todo Task. Number of total todos {todos.length}</h1>

      <div className={buttonStyles.root}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/addTodo")}
        >
          Add todo
        </Button>
      </div>

      <div className=" row_area">
        <div className="completed">
          <p>All todos</p>
          <GreenCheckbox checked={allSelected} onChange={handleAllSelected}  />
        </div>

        <div className="completed">
          <p>Only Completed</p>
          <GreenCheckbox checked={filter} onChange={handleFilter}  />
        </div>

        <TextField
          id="outlined-search"
          label="Search by todo or name"
          type="search"
          variant="outlined"
          style={{ width: "50ch", marginTop: "20px" }}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Todo</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos &&
              todos
                .filter((todo) => {
                  
                  if(allSelected){
                    return todo
                  }

                  else if ( filter == todo.completed){
                    return todo
                  }
                })
                .filter(todo => {
                  const user = usersById[todo.id];

                  if(                 
                         searchItem === "" ||
                      todo.title
                        .toLocaleLowerCase()
                        .includes(searchItem.toLocaleLowerCase()) ||
                      user.name
                        .toLocaleLowerCase()
                        .includes(searchItem.toLocaleLowerCase())){
                        return todo
                  }
                })
                .map((todo) => {
                  const user = usersById[todo.id];
                  return (
                    <StyledTableRow key={todo.id}>
                      <StyledTableCell component="th" scope="user">
                        {todo.completed ? "Completed" : "Ongoing"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user && user.name}{" "}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {" "}
                        {todo.title}{" "}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <div className={buttonStyles.root}>
                          <ButtonGroup
                            variant="contained"
                            color="primary"
                            aria-label="contained primary button group"
                          >
                            <Button
                              style={{ marginRight: "5px" }}
                              onClick={() =>
                                history.push(`/editTodo/${todo.id}`)
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              color="secondary"
                              onClick={() => handleDelete(todo.id)}
                            >
                              Delete
                            </Button>
                          </ButtonGroup>
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Home;

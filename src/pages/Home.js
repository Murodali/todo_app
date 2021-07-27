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
import { deleteTodo, loadTodos, loadUsers } from "../redux/actions/actions";
import {ButtonGroup,Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom'

const useButtonStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
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

  const usersById = users && users.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});

  const handleDelete = (id) => {

    if(window.confirm("Are you sure?")){
        dispatch(deleteTodo(id))
    }

  }

  let history = useHistory();

  return (
    <div className="home">
      <h1>This is a sample Todo Task. Number of total todos {todos.length}</h1>
      <div className={buttonStyles.root}>
        <Button variant="contained" color="primary" onClick={ () => history.push('/addTodo')}>Add todo</Button>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="center" >Name</StyledTableCell>     
              <StyledTableCell align="center" >Todo</StyledTableCell>
              <StyledTableCell align="center" >Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos &&
              todos.map((todo) => {

                const user = usersById[todo.id];
           
           
                return (
                  <StyledTableRow key={todo.id}>
                    <StyledTableCell component="th" scope="user">
                      {todo.completed ? "Completed" : "Ongoing"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.name}{" "}
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
                        <Button style={{marginRight: "5px" }}>Edit</Button>
                        <Button color="secondary" onClick={() => handleDelete(todo.id)}>Delete</Button>
                      
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

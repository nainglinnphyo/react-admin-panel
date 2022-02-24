import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getUsers } from "../../redux/features/userSlice";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import "./UserTable.css";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 300,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
    editable: true,
  },
  {
    field: "password",
    headerName: "Password",
    width: 400,
    editable: true,
  },
];

export default function UserTable() {
  const data = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const rows = data.list;

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [pageSize, setPageSize] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const[userData,setUserData]=React.useState({name:'',email:'',password:''})

  const addUser=(e)=>{
    e.preventDefault()
    dispatch(createUser(userData))
    setUserData({name:'',email:'',password:''})
    setOpen(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return data.status === "loading" ? (
    <h2>Loading</h2>
  ) : data.status === "failed" ? (
    <h2>{data.error}</h2>
  ) : (
    <div className="main-user">
      <div className="add-button">
        <Button variant="contained"  onClick={handleClickOpen}>Add User</Button>
        <Dialog className="form" open={open} onClose={handleClose}>
          <form onSubmit={addUser}>
          <DialogTitle>Form</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={userData.name} onChange={(e)=>setUserData({...userData,name:e.target.value})}
              required
            />
            <TextField
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}
              required

            />
            <TextField
              margin="dense"
              id="name"
              label="Password"
              type="text"
              fullWidth
              variant="standard"
              value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="onSubmit">Save</Button>
          </DialogActions>
          </form>
        </Dialog>
      </div>
      <div style={{ height: 430, width: "100%" }}>
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          rows={rows}
          columns={columns}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
}

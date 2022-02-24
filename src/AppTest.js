import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getUsers } from "./redux/features/userSlice";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.users);

  const[userData,setUserData]=useState({name:'',email:'',password:''})

  const addUser=(e)=>{
    e.preventDefault()
    dispatch(createUser(userData))
    setUserData({name:'',email:'',password:''})
  }
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return data.status === "loading" ? (
    <h2>Loading</h2>
  ) : data.status === "failed" ? (
    <h2>{data.error}</h2>
  ) : (
    <div>
      <form onSubmit={addUser}>
        <input value={userData.name} onChange={(e)=>setUserData({...userData,name:e.target.value})}/>
        <input value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}/>
        <input value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}/>
        <button>Add</button>
      </form>
      {data.list.map((u) => {
        return <h2 key={u.id}>{u.name}</h2>;
      })}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
export function UserList()
{
   
    const [users,setUsers]=useState([]);
    const [userId,setUserId]=useState(0);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

    const onSelectChange=(e: React.ChangeEvent<HTMLSelectElement>)=>{
        setUserId(e.target.value);
    }

    useEffect(()=>{
     
        const controller=new AbortController();
        const signal=controller.signal;
        const fetchUsers=async()=>{
            try{
                
                const response=await fetch('https://jsonplaceholder.typicode.com/users', { signal });
                if (!response.ok){
                    throw new Error('Network Exception Error');
                }
                const data=await response.json();
                setUsers(data);
            }
            catch(err){
                
                if (err.name !== 'AbortError')
                    setError(err.name)
            }
            finally{
                
                setLoading(false);
            }}
            fetchUsers();
            return()=>{
                controller.abort();
            }
        
    },[]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>User List</h1>
      <select name="userlist" onChange={onSelectChange}>
        {users.map(user => (
          <option value={user.id}>{user.name}</option>
        ))}
      </select>
      <UserDetails userId={userId}/>
    </div>
  );
}
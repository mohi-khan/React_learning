import {useState,useEffect} from 'react';

function UserList(){
  const [users,setUsers]=useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect(()=>{
    const controller=new AbortController();
    const signal=controller.signal;
    const fetchUsers=async()=>{
      try{
        const response=await fetch('https://jsonplaceholder.typicode.com/users', { signal });
        if (!response.ok)
          {
            throw new Error('Network Exception');
          }
        const data = await response.json();
        setUsers(data);
      }
      catch(err){
        if (err.name !== 'AbortError')
          setError(err.name)
      }
      finally{
          setLoading(false);
      }
    }
    fetchUsers();
    return () => {
      controller.abort();
    }
  },[])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default UserList;
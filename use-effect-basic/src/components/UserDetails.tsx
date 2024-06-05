import { useEffect, useState } from "react";

export default function UserDetails({userId} : number){
    const[userdetail,setUserDetail]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    
    useEffect(()=>{
        const controller=new AbortController();
        const signal=controller.signal;
       
        const fetchUser=async()=>{
            try{
            const link = `https://jsonplaceholder.typicode.com/users/${userId}`;
            const response=await fetch(link,{signal});
            if (!response.ok)
                throw new Error('Netork Error');
            const data=await response.json();
            setUserDetail(data);
            }
            catch(err){
                if (err.name !== 'AbortError')
                    setError(err.name)
            }
            finally{
                setLoading(false);

            }
        }
            fetchUser();

        
    },[userId])
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
          <h1>User Details</h1>
          <table>
            <tbody>
            <tr><td>Name:</td><td>{userdetail.name}</td></tr>
            <tr><td>Phone:</td><td>{userdetail.phone}</td></tr>
            </tbody>
          </table>
          </div>)
}
"use client"
import { db } from '@/configs/db';
import { USER_TABLE } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { eq } from 'drizzle-orm';
import React, { useEffect } from 'react'

function Provider({children}) {
    
    
    const {user} = useUser(); // User from Clerk

    useEffect(()=> { //Called whenever 
        user&&CheckIsNewUser();
    },[user])
    const CheckIsNewUser=async()=>{
        // Check If User Already Exist
        // const result=await db.select().from(USER_TABLE)
        // .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress)) // Query to get user from DB
        // console.log(result); 
        // if(result?.length==0){
        //     // Is Not, Then add to DB
        //     const UserResp = await db.insert(USER_TABLE).values({
        //         name:user?.fullName, //Full name from clerk. 
        //         email:user?.primaryEmailAddress?.emailAddress // email address from Primary Email.
        //     }).returning({id:USER_TABLE.id}) // Stores id to UserResp

        //     console.log(UserResp);
        // }
        const resp=await axios.post('/api/create-user', {user:user});
        console.log(resp.data);
        
        
        
    }
  
    return (
    
    <div>
      {children}
    </div>
  )
}

export default Provider

"use client"
import { useUser } from '@clerk/nextjs';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CourseCardItem from './CourseCardItem';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

function CourseList() {
    const {user}=useUser();
    const [CourseList, setCourseList]=useState([]);
    const [loading, setLoading]=useState(false);
    useEffect(()=>{
        user&&GetCourseList();

    },[user])
    const GetCourseList=async()=>{
        setLoading(true);
        const result=await axios.post('/api/courses', {createdBy:user?.primaryEmailAddress.emailAddress})
        console.log(result);
        setCourseList(result.data.result);
        setLoading(false);
    }
  
    return (
    <div className='mt-10'>
      <h2 className='font-bold text-2xl flex justify-between items-center '> Your Study Material
        <Button variant="outline" onClick ={GetCourseList} className='border-black'><RefreshCw/>Refresh</Button>

      </h2>

      <div className= 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'> 
        {loading==false? CourseList?.map((course, index)=>(
            <CourseCardItem course={course} key={index} />
        ))
        :[1,2,3,4,5,6].map((item,index)=>(
            <div key={index} className='h-56 w-full bg-slate-200 rounded-lg animate-pulse'>

            </div> 

        ))
        }

      </div>
    </div>
  )
}

export default CourseList

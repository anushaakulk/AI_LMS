"use client"
import React, { useState } from 'react'
import SelectOption from './_components/SelectOption'
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import TopicInput from './_components/TopicInput';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function Create() {
    const [step,setStep] = useState(0);
    const [formData, setFormData]=useState([])
    const {user} = useUser();
    const [loading, setLoading]=useState(false);
    const router = useRouter();
    const handleUserInput =(fieldName, fieldValue)=> {
        setFormData(prev=>({
            ...prev, 
            [fieldName]: fieldValue



        }))
        console.log(formData);
    }

    const GenerateCourseOutline=async()=> {
      console.log(formData)
      const courseId=uuidv4();
      setLoading(true);  
      const result= await axios.post('/api/generate-course-outline',{
        courseId: courseId,
        topic: formData.topic,
        courseType: formData.studyType, // Map 'studyType' to 'courseType'
        difficultyLevel: formData.difficultylevel, // Map 'difficultylevel' to 'difficultyLevel'
        createdBy: user?.primaryEmailAddress.emailAddress, // Fix typo: 'createBy' -> 'createdBy'
      })
        setLoading(false);
        router.replace('/dashboard')
        toast("Your course is generating, please press the refresh button to see if the course has generated or not.")
        console.log(result.data.result.resp);
    }
    return (
    <div className='flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20'>
      <h2 className= 'font-bold text-3xl text-black'> Start Building your Personal Study Material</h2>
      <p className='text-gray-500 text-lg'>Fill the details to start generating your study material for your next project!</p>
      <div className='mt-10'> 
        {step==0? <SelectOption selectedStudyType={(value)=> handleUserInput('studyType', value)}/>
        :<TopicInput
        SetTopic={(value) => handleUserInput('topic', value)}
        setDifficultyLevel={(value)=> handleUserInput('difficultylevel', value)}
        
        />}
      </div>
      <div className='flex justify-between w-full mt-32'> 
        {step!=0 ?<Button variant = "outline" onClick={()=>setStep(step-1)}>Previous</Button>:' '}
        {step==0?<Button onClick={()=>setStep(step+1)}>Next</Button>: <Button onClick={GenerateCourseOutline} disabled={loading}>{loading?<Loader className='animate-spin'/>:'Generate'}</Button>}
      </div>
    </div>
  )
}

export default Create

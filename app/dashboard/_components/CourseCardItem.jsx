import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LucideRefreshCw, RefreshCcw, RefreshCw, RefreshCwIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function formatDate(isoString) {
  const date = new Date(isoString);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  // Add suffix to day
  const daySuffix = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${day}${daySuffix(day)} ${month} ${year}`;
}
function CourseCardItem({course}) {
  return (
    <div className='border rounded-lg shadow-md p-5'>
      <div> 
        <div className='flex justify-between items-center mt-7' > 
            <Image src = {'/knowledge.png'} alt='other' width={50} height={50} />
            <h2 className='text-[10px] p-1 px-2 rounded-full bg-black text-white'>{formatDate(course?.createdAt)}</h2>
        </div>
        <h2 className='mt-3 font-medium text-lg'>{course?.courseLayout.course_name || course?.courseLayout.job_title}</h2>
        <p className='text-sm line-clamp-2 text-gray-500 mt-2'> {course?.courseLayout.course_summary}</p>
      
      <div> 
        
      </div>
      <div className='mt-3'>
      {/* <Progress value={0}/> */}
      </div>
      <div className='mt-3 flex justify-end'> 
        {course?.status == 'Generating'? <h2 className='text-sm flex gap-2 item-center p-1 px-2 rounded-full bg-black text-white'> 
        <RefreshCw className='h-5 w-5 animate-spin'/>
        Generating...</h2>: 
        <Link href={'/course/'+course?.courseId}>
        <Button>View</Button>
        </Link>
        }
      </div>
      </div>
    </div>
  )
}

export default CourseCardItem

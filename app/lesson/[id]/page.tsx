"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Elevate from '@/components/ui/elevate';
import Navbar from '@/components/ui/navbar';


export default function page({params}:any) {
  const [lesson, setLesson] = useState<any>({});
  const id = params.id;


  useEffect(() => {
    const url = 'http://localhost:8080/api/lessons/single/' + id;
    const fetchData = async () => {
    try {
        const res = await axios.get(url);
        setLesson(res.data);
        console.log(res.data)
    } catch (err) {
        console.error('Error fetching data:', err);
    }
    };

    fetchData();
}, []);

  return (
    <div className='bg-black w-screen max-w-2xl min-h-screen text-white h-max px-10 py-7'>
        <Navbar />
        <h1 className='font-bold text-2xl'>{lesson?.name}</h1>
        <p className='mt-3 text-neutral-300'>{lesson?.description}</p>

        <Elevate href={`/edit/${id}`} value="Edit"/>

    </div>    
);
}

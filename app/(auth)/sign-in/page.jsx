"use client";
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderIcon } from 'lucide-react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const SignIn = () => {
  const[password,setPassword] = useState();
  const[email,setEmail] = useState();
  const router = useRouter();
  const[loader,setLoader] = useState();
  useEffect(()=>{
    const jwt = sessionStorage.getItem('jwt');
    if(jwt){
      router.push('/');
    }
  })
  const onSignIn=()=>{
    setLoader(true)
    GlobalApi.SignIn(email,password).then(resp=>{
      sessionStorage.setItem('user',JSON.stringify(resp.data.user));
      sessionStorage.setItem('jwt',resp.data.jwt);
      toast("Login SuccessFully")
      router.push('/');
      setLoader(false)
    },(e)=>{
      console.log(e)
      toast(e?.response?.data?.error?.message)
      setLoader(false)
    })
  }
  return (
    <div className='flex items-baseline justify-center my-20'>
      <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
        <Link href={"/"}><h1 className='text-5xl pb-2'>Aadi<span className='text-red-600'>Mart</span></h1></Link>
        <h2 className='font-bold text-3xl pb-3'>Sign-In To Account</h2>
        <h2 className='text-gray-500 pb-1'>Enter your Email & Password to SignIn</h2>
        <div className='w-full flex flex-col gap-5 mt-7'>
          <Input placeholder='email@gmail.com' onChange={(e)=>setEmail(e.target.value)}/>
          <Input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
          <Button onClick={()=>onSignIn()} disabled={!(email||password)}>{loader? <LoaderIcon className='animate-spin'/> : 'SignIn'}</Button>
          <p>Don't have a account <Link href={'/create-account'} className='text-blue-600'>Click Here to Create An Account</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignIn

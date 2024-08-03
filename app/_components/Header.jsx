"use client";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserIcon, LayoutGrid, Search, ShoppingBag } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Header() {
  const [CategoryList, setCategoryList] = useState([]);
  const isLogin=sessionStorage.getItem('jwt')?true:false
  const router = useRouter();

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      const resp = await GlobalApi.getCategory();
      console.log("Full API Response:", resp);
      setCategoryList(resp.data.data);
    } catch (error) {
      console.error("Error fetching category list:", error);
    }
  };

  const onSignOut=()=>{
    sessionStorage.clear();
    router.push('/sign-in')
  }

  return (
    <div className='p-5 shadow-sm flex justify-between'>
      <div className='flex items-center gap-8'>
       <Link href={'/'}><h1 className='text-4xl'>Aadi<span className='text-red-600'>Mart</span></h1></Link> 
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className='hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer'>
              <LayoutGrid className='h-5 w-5' /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {CategoryList.map((category, index) => {
              const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
              const iconPath = category.attributes.Icon.data[0].attributes.url;
              const imageUrl = `${baseURL}${iconPath}`;

              return (
                  <Link href={"/products-category/"+category.attributes.Name} key={index}>
                <DropdownMenuItem className="flex gap-2 items-center cursor-pointer">
                  <Image
                    src={imageUrl}
                    unoptimized={true}
                    alt={category?.attributes?.Name}
                    width={27}
                    height={27}
                  />
                  <h2>{category?.attributes?.Name}</h2>
                </DropdownMenuItem>
                  </Link>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className='md:flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
          <Search />
          <input type="text"  placeholder='Search' className='outline-none' />
        </div>
      </div>
      <div className='flex gap-5 items-center'>
        <h2 className='gap-2 flex items-center text-lg'><ShoppingBag /> 0</h2>
     {!isLogin? <Link href={'/sign-in'}>
         <Button>Login</Button>
         </Link> :  
         <DropdownMenu>
  <DropdownMenuTrigger asChild><CircleUserIcon className='bg-green-100 cursor-pointer p-2 rounded-full text-primary h-12 w-12'/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>My Order</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>onSignOut()}>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
}

      </div>
    </div>
  );
}

export default Header;

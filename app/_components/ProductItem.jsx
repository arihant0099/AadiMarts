import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import ProductItemDetails from './ProductItemDetails';
  

const ProductItem = ({ product }) => {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const iconPath = product.attributes.images.data[0].attributes.url;
  const imageUrl = `${baseURL}${iconPath}`;

  return (
    <div className='p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg group cursor-pointer'>
      <Image src={imageUrl} width={200} height={200} className='h-[200px] w-[200px] object-contain group-hover:scale-105 transition-all ease-in-out' alt={product.attributes.name || 'Product Image'} />
      <div className='flex gap-4 items-center justify-center'>
      <h2 className='font-bold text-lg'>{product.attributes.name}</h2>
      {product.attributes.sellingPrice && <h2 className='text-primary'>${product.attributes.sellingPrice}</h2>}
      <h2 className={`font-bold ${product.attributes.sellingPrice &&'line-through text-red-600'}`}>${product.attributes.mrp}</h2>
      </div>
      <Dialog>
    <DialogTrigger asChild>
    <Button variant="outline" className="text-primary hover:text-white hover:bg-primary">Add to Cart</Button> 
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogDescription>
            <ProductItemDetails product={product}/>
        </DialogDescription>
        </DialogHeader>
    </DialogContent>
    </Dialog>
    </div>
  );
};

export default ProductItem;
 
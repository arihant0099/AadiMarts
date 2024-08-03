import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const TopCategoryList = ({categoryList, selectedCategory}) => {
  return (
            <div className="flex gap-5 mt-2 overflow-auto mx-7 md:mx-20 justify-center">
        {categoryList && categoryList.length >= 0 ? (
          categoryList.map((category, index) => {
            const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
            const iconPath = category.attributes.Icon.data[0].attributes.url;
            const imageUrl = `${baseURL}${iconPath}`;

            return (
              <Link href={'/products-category/'+category.attributes.Name} key={index} 
              className={`flex flex-col items-center gap-2 bg-green-50 p-3 rounded-lg group cursor-pointer 
              hover:bg-green-200 w-[150px] min-w-[100px] ${selectedCategory==category.attributes.Name && 'bg-green-600 text-white'}`}>
                <Image
                  src={imageUrl}
                  unoptimized={true}
                  alt={category.attributes.Name || 'Category Image'}
                  width={50}
                  className='group-hover:scale-125 transition-all ease-in-out'
                  height={50}
                />
                <h2 className={`text-green-800 ${selectedCategory==category.attributes.Name && 'text-white'}`}>{category?.attributes?.Name}</h2>
              </Link>
            )
          })
        ) : (
          <p>No categories available</p>
        )}
      </div>
  )
}

export default TopCategoryList

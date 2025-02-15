'use client';

import noResultIllustration from '@/public/search.svg';
import Image from 'next/image';
import MenuBtn from './_ui/MenuBtn';

export default function NoResults({ query, bgColor }) {
   return (
      <div
         className='flex flex-col justify-center items-center min-h-screen w-full text-center max-w-xl p-10 gap-4'
         style={{ backgroundColor: bgColor.mainBackground }}
      >
         <MenuBtn className='absolute top-5 left-5' bgColor={bgColor} />

         <h1
            className='text-4xl font-thin'
            style={{ color: bgColor.primaryText }}
         >
            No results found !
         </h1>

         <div className='flex justify-center items-center'>
            <Image
               src={noResultIllustration}
               alt='no-results-illustration'
               className='mx-auto w-52 h-52 sm:w-64 sm:h-64'
            />
         </div>

         <p
            className='text-base font-light'
            style={{ color: bgColor.primaryText }}
         >
            We couldn&apos;t find any matches for &quot;{query}&quot;.
            <br />
            Try searching with different keywords.
         </p>

         <div className='w-full flex justify-center cursor-pointer'>
            <button
               onClick={() => window.history.back()}
               className='w-1/2 py-2 px-4 rounded-lg transition text-center font-normal'
               style={{
                  backgroundColor: bgColor.toggleBackground,
                  color: bgColor.toggleText,
               }}
               onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = bgColor.toggleHover)
               }
               onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = bgColor.toggleBackground)
               }
            >
               Go Back
            </button>
         </div>
      </div>
   );
}

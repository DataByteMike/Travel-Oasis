import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';

type listingDetails = {
  img: string,
  location: string,
  address: string,
  name: string,
  description: string,
  rating: string,
  price: any,
  page: string,
}

export default function InfoCard({ img, location, address, name, description, rating, price, page }: listingDetails ) {
  return (
    <div className='flex py-7 px-2 pr-4 border-b border-l border-r cursor-pointer first:border-t
      hover:opacity-80 hover:shadow-lg transition duration-200 ease-out'>
      <div className='relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0'>
        <Image src={img} fill style={{ objectFit:"cover" }} alt="listing image"/>
      </div>
      <div className='flex flex-col flex-grow pl-5'>
        <div className='flex justify-between'>
          <p>{location}</p>
          <HeartIcon className='h-7 cursor-pointer' />
        </div>
        <h4 className='text-xl'>{name}</h4>
        <div className='border-b w-10 pt-2'/>
        <p className='pt-2 text-sm text-gray-500 flex-grow'>{page}</p>
        <div className='flex justify-between items-end pt-5'>
          <p className='flex items-center'>
            <StarIcon className='h-5 text-red-400' />
            {rating}
          </p>
          {/* <div className='text-lg lg:text-2x; font-semibold pb-2'>{`${price["currency"]} ${price["rate"]}`}</div> */}
        </div>
      </div>
    </div>
  )
}
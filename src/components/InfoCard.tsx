import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';

type listingDetails = {
  img: string,
  location: string,
  name: string,
  description: string,
  rating: string,
  price: any,
  page: string,
}

export default function InfoCard({ img, location, name, description, rating, price, page}: listingDetails ) {
  return (
    <div className='flex flex-col sm:flex-row py-7 px-6 pr-2 border-b border-l border-r cursor-pointer first:border-t
      hover:opacity-80 hover:shadow-lg transition duration-200 ease-out'>
      <div className='relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0'>
        <Image src={img} fill style={{ objectFit:"cover" }} alt="listing image"/>
      </div>
      <div className='flex flex-col flex-grow sm:pl-5'>
        <div className='flex justify-between items-center mt-4 sm:mt-0'>
          <p>{(location != null ? location : "Unknown")}</p>
          <HeartIcon className='h-7 cursor-pointer' />
        </div>
        <div>{description}</div>
        <h4 className='sm:text-xl'>{name}</h4>
        <div className='border-b w-10 pt-2'/>
        <h5 className='mt-2'>{price.total == null ? `Total: $${price.rate} For Stay` : `Rate Per Night: $${price.rate}` }</h5>
        <div className='flex justify-between items-center pt-5'>
          <p className='flex items-center'>
            <StarIcon className='h-5 text-[#883D1A]' />
            &nbsp;{rating}
          </p>
          <p className='pt-2 text-sm text-gray-500'>
            <Link href={page} className='underline' target='_blank'>
              Link to Airbnb
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
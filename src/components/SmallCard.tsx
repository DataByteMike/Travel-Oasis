import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/outline';

type Props = {
  img: string,
  location: string,
  country: string,
  countryCode: string,
  rating: string
}

export default function SmallCard({img, location, country, countryCode, rating}: Props) {
  return (
    <Link
      target='_blank'
      className='flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out'
      href={`https://www.airbnb.com/a/stays/${location}--${countryCode}--${country}?mlamenities=true&c=.pi0.pk475441696_80156716520&localized_ghost=true&gclid=Cj0KCQjwuLShBhC_ARIsAFod4fKTEahR7HVdwlcwCR3EPQw8DgJ8k1K9FaUmOw0pUiqZkcyoNIOUxyUaAr9_EALw_wcB`}
    >
      <div className='relative h-16 w-16'>
        <Image src={img} fill  alt={location} className='rounded-lg border border-black' />
      </div>
      <div className=''>
        <h2>{location}, {country}</h2>
        <h3 className='text-gray-500'>
          <p className='flex items-center'>
            <StarIcon className='h-5 text-[#883D1A]' />&nbsp;{rating} Review Score
          </p>
        </h3>
      </div>
    </Link>
  )
}
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

export default function Hero({}: Props) {
  return (
    <div className='relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[1000px]'>
      <Image
        src='/hero/banner.jpg' 
        fill 
        style={{objectFit: 'cover'}} alt='banner'
        className='filter contrast-75'
      />
      <div className='absolute top-[30%] sm:top-[35%] md:top-[45%] lg:top-1/2  w-full text-center'>
        <p className='text-sm text-gray-200 sm:text-lg'>Feel Like Exploring? Let Us Help</p>
        <Link href="https://www.airbnb.com" target="_blank">
          <button className='text-yellow-700 bg-beige px-10 py-4 shadow-sm rounded-full font-bold my-3 hover:shadow-xl active:scale-90 hover:text-yellow-900 transition duration-150'>
            Take Me Away
          </button>
        </Link>
      </div>
    </div>
  )
}
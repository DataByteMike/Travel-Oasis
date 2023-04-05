import Image from 'next/image';
import Link from 'next/link';

type Props = {
  title: string,
  img: string
}

export default function MediumCard({title, img}: Props) {
  return (
    <div className='cursor-pointer hover:scale-105 transform transition duration-300 ease-out'>
      <div className='relative h-80 w-[15.5rem] md:w-80'>
        <Image src={img} fill alt="" className='rounded-xl border border-black'/>
      </div>
      <h3 className='text-2xl mt-3'>{title}</h3>
    </div>
  )
}
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  img : string,
  title: string,
  description: string,
  buttonText: string,
}

export default function LargeCard({img, title, description, buttonText}: Props) {
  return (
    <section className='relative py-16 cursor-pointer'>
      <div className='relative h-96 md:min-w-[300px]'>
        <Image src={img} fill style={{ objectFit:"cover" }} alt='ss' className='rounded-2xl filter contrast-50 border border-black' />
      </div>
      <div className='absolute top-32 left-4 sm:left-12 text-white text-left'>
        <h3 className='text-4xl mb-3 w-64 '>{title}</h3>
        <p>{description}</p>
        <Link href={''}>
          <button className='text-sm text-black bg-beige px-4 py-2 rounded-lg mt-5'>
            {buttonText}
          </button>
        </Link>
      </div>
    </section>
  )
}
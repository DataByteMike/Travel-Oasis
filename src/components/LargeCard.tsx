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
        <Link
          target='_blank'
          href="https://www.airbnb.com/?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&search_mode=flex_destinations_search&flexible_trip_lengths%5B%5D=one_week&location_search=MIN_MAP_BOUNDS&price_filter_input_type=0&price_filter_num_nights=5&channel=EXPLORE&category_tag=Tag%3A8661&search_type=category_change"
        >
          <button className='text-sm text-black bg-beige px-4 py-2 rounded-lg mt-5'>
            {buttonText}
          </button>
        </Link>
      </div>
    </section>
  )
}
import Link from 'next/link';
import { useState } from 'react';

type Props = {}

export default function Footer({}: Props) {
  const [openFooter, setOpenFooter] = useState(false);

  return (
    <footer className='text-gray-800 md:sticky bottom-0 z-50 bg-beige border-t-gray-400'>
      <div className='flex  flex-wrap gap-3 justify-center md:justify-between p-5 md:px-10'>
        <ul className='flex md:list-disc space-x-3 md:space-x-8'>
          <li className='list-none'>
            &copy; Travel Oasis {new Date().getFullYear()}
          </li>
          <li className=''>
            <Link href='https://github.com/DataByteMike' target='_blank'>
              GitHub
            </Link>
          </li>
        </ul>
        <div className='flex'>
          <button className='hover:underline rounded-lg' onClick={() => setOpenFooter(!openFooter)}>Practice is Key</button>
          <p className='animate-bounce'>&nbsp;&uarr;</p>
        </div>
      </div>
    </footer>
  )
}
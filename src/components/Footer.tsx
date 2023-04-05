import Link from 'next/link';

type Props = {}

export default function Footer({}: Props) {
  return (
    <footer className='sticky bottom-0 z-50 flex flex-wrap gap-3 grid-cols-2 md:grid md:grid-cols-3 bg-beige border border-gray-400 p-5 md:px-10'>
      <ul className='flex list-disc space-x-8'>
        <li className='list-none'>&copy; Travel Oasis {new Date().getFullYear()}</li>
        <li><Link href='https://github.com/DataByteMike'>GitHub</Link></li>
        <li className='hidden'>Login</li>
      </ul>
    </footer>
  )
}
import { useRouter } from 'next/router';
import Header from '@/components/Header';

type bookingDetails = {
  location: string,
  checkIn: string,
  checkOut: string,
  guest: number
};

export default function Result({ listing } : any) {
  const router = useRouter();
  const { location, checkIn, checkOut, guest } = router.query;
  console.log(listing);
  
  return (
    <div>
      <Header />
      <main>
        <section>
          <p className='text-xs'>Stays - for {guest} guests</p>
          <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>
          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
            <button>Cancellation Flexibility</button>
            <button>Type of Place</button>
            <button>Price</button>
            <button>Rooms and Beds</button>
            <button>More filters</button>
          </div>
        </section>
      </main>
    </div>
  )
}

// export async function getServerSideProps(context: bookingDetails) {
//   // Check to bypass env error
//   const getEnv = (name: string | undefined) => {
//     if (typeof name === 'undefined') {
//      throw new Error('Variable ${name} undefined.');
//     }
//     return name;
//   }

//   const {location, checkIn, checkOut, guest} = context;

//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': getEnv(process.env.RAPID_API_KEY),
//       'X-RapidAPI-Host': getEnv(process.env.RAPID_API_HOST)
//     }
//   };
  
//   let url = `${getEnv(process.env.PROTECTED_URL)}location=${"Japan"}s&checkin=`;
//   url += `${"2023-09-16"}&checkout=${"2023-09-17"}&adults=${1}&children=0&infants=0&pets=0&page=1&currency=USD`;

//   const response = await fetch(url, options);
//   const searchResults = await response.json();

//   return {
//     props: {
//       listing: searchResults
//     }
//   };
// }
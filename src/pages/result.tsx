import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '@/components/Header';
import InfoCard from '@/components/InfoCard';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

type bookingDetails = {
  location: string,
  checkIn: string,
  checkOut: string,
  guest: number
};

type listingDetails = {
  address: string,
  amenityIds: number[],
  bathrooms: number,
  bedrooms: number,
  beds: number,
  cancelPolicy: string,
  city: string,
  deeplink: string,
  hostThumbnail: string,
  id: string,
  images: string[],
  isSuperhost: boolean,
  lat: number,
  lng: number,
  name: string,
  persons: number,
  position: number,
  previewAmenities: string[],
  price: any,
  rareFind: boolean,
  rating: number,
  reviewsCount: number,
  type: string,
  url: number,
  userId: number,
}

export default function Result({ listing } : InferGetServerSidePropsType<GetServerSideProps>) {
  const router = useRouter();
  const { location, checkIn, checkOut, guest } = router.query;
  const [searchResult, setSearchResult] = useState(listing?.results);

  // Check if the passed string is not undefined
  const rateAvaiable = (rates: number | undefined) => {
    let rateString = "N/A"
    if (rates != undefined) {
      rateString = rates.toString();
    }
    return rateString;
  };

  return (
    <div className=''>
      <Header placeholder={`${location} | ${checkIn} | ${guest} guests`} />
      <main className='flex'>
        <section className='flex-grow pt-14 px-3 sm:px-4 md:px-10 lg:px-20'>
          <p className='text-xs px-1 sm:px-0'>{searchResult.length} Stays - for {guest} guests</p>
          <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>
          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
            <button>Cancellation Flexibility</button>
            <button>Type of Place</button>
            <button>Price</button>
            <button>Rooms and Beds</button>
            <button>More filters</button>
          </div>
          <div className='flex flex-col'>
            {searchResult?.map(({address, amenityIds, bathrooms, bedrooms, beds, cancelPolicy, city, 
              deeplink, hostThumbnail, id, images, isSuperhost, lat, lng, name, persons, 
              position, previewAmenities, price, rareFind, rating, reviewsCount, type, url, userId} : listingDetails, key: number) => {
                return (
                  <InfoCard
                  key={key}
                  img={images[0]}
                  location={city}
                  address={address}
                  name={name}
                  description={""}
                  rating={rateAvaiable(rating)}
                  price={price}
                  page={deeplink}
                />
                );
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

export async function getServerSideProps(context: bookingDetails) {
  // Check to bypass env error
  const getEnv = (name: string | undefined) => {
    if (typeof name === 'undefined') {
     throw new Error(`Variable ${name} undefined.`);
    }
    return name;
  };

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': getEnv(process.env.RAPID_API_KEY),
      'X-RapidAPI-Host': getEnv(process.env.RAPID_API_HOST)
    }
  };
  
  let url = `${getEnv(process.env.PROTECTED_URL)}location=${context.location}s&checkin=`;
  url += `${context.checkIn}&checkout=${context.checkOut}&adults=${context.guest}&children=0&infants=0&pets=0&page=1&currency=USD`;

  const response = await fetch(url, options);
  const searchResults = await response.json();

  return {
    props: {
      listing: searchResults
    }
  };
};
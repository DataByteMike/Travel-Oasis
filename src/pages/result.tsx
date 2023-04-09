import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Header from '@/components/Header';
import InfoCard from '@/components/InfoCard';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Footer from '@/components/Footer';

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
  const [cancellation, setCancellation] = useState("");
  const [bed, setBeds] = useState("");
  const [price, setPrice] = useState("");

  // Check if the passed string is not undefined
  const rateAvaiable = (rates: number | undefined) => {
    let rateString = "N/A"
    if (rates != undefined) {
      rateString = rates.toString();
    }
    return rateString;
  };

  useEffect(() => {
    if (price === "cheap") {
      setSearchResult(
        listing?.results.filter((item: any) => { return ( item.price.rate < 150) })
      );
    }

    if (bed === "more_bed") {
      setSearchResult(
        listing?.results.filter((item: any) => { return (item.beds > 1)})
      );
    }

    if (cancellation === "Flexibility") {
      setSearchResult(
        listing?.results.filter((item: any) => { return (item.cancelPolicy === "CANCEL_FLEXIBLE")})
      );
    }
  }, [cancellation, bed, price]);

  return (
    <div className=' '>
      <Header placeholder={`${location} | ${checkIn} - ${checkOut} | ${guest} guests`} />
      <main className='flex mb-16'>
        <section className='flex-grow pt-14 px-3 sm:px-4 md:px-10 lg:px-20'>
          <p className='text-xs px-1 sm:px-0'>{searchResult?.length} Stays - for {guest} guests</p>
          <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>
          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
            <button className='button' onClick={() => setCancellation("Flexibility")}>Cancellation Flexibility</button>
            <button className='button' onClick={() => setPrice("cheap")}>Price</button>
            <button className='button' onClick={() => setBeds("more_bed")}>Rooms and Beds</button>
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
                  name={name}
                  description={type}
                  rating={rateAvaiable(rating)}
                  price={price}
                  page={deeplink}
                />
                );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export async function getServerSideProps(context: any) {
  // Check to bypass env error
  const getEnv = (name: string | undefined) => {
    if (typeof name === 'undefined') {
      throw new Error(`Variable ${name} undefined.`);
    }
    return name;
  };

  const { location, checkIn, checkOut, guest } = context.query;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': getEnv(process.env.RAPID_API_KEY),
      'X-RapidAPI-Host': getEnv(process.env.RAPID_API_HOST)
    }
  };
  
  let url = `${getEnv(process.env.PROTECTED_URL)}location=${location}s&checkin=`;
  url += `${checkIn}&checkout=${checkOut}&adults=${guest}&children=0&infants=0&pets=0&page=1&currency=USD`;

  const response = await fetch(url, options);
  const result = await response.json();

  return {
    props: {
      listing: result
    }
  };
};
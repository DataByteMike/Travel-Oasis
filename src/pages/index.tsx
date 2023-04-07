import Head from 'next/head';
import { InferGetStaticPropsType } from 'next/types';

import client from '@/libs/mongodb';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SmallCard from '@/components/SmallCard';
import MediumCard from '@/components/MediumCard';
import LargeCard from '@/components/LargeCard';

import { useState } from 'react';
import imageContainer from '@/Utils/imageContainer';
import Footer from '@/components/Footer';

export default function Home(props : InferGetStaticPropsType<typeof getStaticProps>) {
  const [listing, setListing] = useState(props.listing);

  return (
    <div className=''>
      <Header placeholder="" />
      <Hero />
      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Popular Spots</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {listing?.map((item : any, id: number) => {
              return (
                <SmallCard
                  key={id}
                  img={item.images.picture_url}
                  location={item.address.market}
                  country={item.address.country}
                  countryCode={item.address.country_code}
                  rating={item.review_scores.review_scores_rating}
                />
              );
            })}
          </div>
        </section>
        <section>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>
          <div className='flex space-x-4 overflow-hidden-scroll p-4 -ml-4 overflow-scroll scrollbar-hide'>
            {imageContainer.map((item, id : number)=> {
              return (
                <MediumCard key={id} title={item.title} img={item.img}/>
              );
            })}
          </div>
        </section>
        <LargeCard 
          img={"/hero/large.jpeg"} 
          title="The Greatest Getaway" 
          description="Wishlists curated by Airbnb"
          buttonText="Get Inspired"
        />
      </main>
      <Footer />
    </div>
  );
};
 
export async function getStaticProps() {
  try {
    const mongoClient = await client;
    const db = mongoClient.db("sample_airbnb");

    const result = await db
      .collection("listingsAndReviews")
      .find({ "review_scores.review_scores_rating" : { $gte : 80} })
      .sort({metacritic: -1 })
      .limit(8)
      .toArray();

    mongoClient.close();

    return {
      props: { 
        listing : JSON.parse(JSON.stringify(result))
      },
    }
  } catch (e) {
    console.error(e);
  };
}

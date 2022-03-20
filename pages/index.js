import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnet } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Home.module.css';
export default function Home() {
  const [shows, setShows] = useState('');
  const [showId, setShowId] = useState('');
  const [posterSearch, setPosterSearch] = useState();
  const [ids, setIds] = useState('');
  const getShows = async () => {
    try {
      const res = await axios.get(
        'https://eztv.re/api/get-torrents?limit=10&page=1'
      );
      if (res) {
        setShows(res.data.torrents);
        console.log('torrents', res.data.torrents);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getShowId = () => {
    // if (!shows) {
    //   return null;
    // } else {
    Object.values(shows).map((id, index) => {
      setShowId(id.imdb_id), console.log(`showId:${index}`, showId);
      // console.log(sh.imdb_id)
      console.log(showId.length);
    });
    // }
  };
  const getPosterId = () => {
    // showId.map((sId) => setIds(sId));
    Object.values(showId).map((id) => setIds(id));
  };
  const searchById = async () => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?i=${ids}&apikey=eb4e26fc`
      );
      if (res) {
        setPosterSearch(res.data);
        console.log('poster', res);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getShows();
  }, []);
  useEffect(() => {
    getShowId();
    getPosterId();
    searchById();
  }, []);
  console.log('ids', ids);
  console.log('s', showId);
  return (
    <>
      <Head>
        <title>EZTV Api</title>
      </Head>
      <div>
        {Object.values(shows).map((show, index) => (
          <>
            <div
              key={show.hash}
              className="flex flex-col gap-y-2 border-8 border-red-700 rouned-md w-3/4"
            >
              <Image
                src={`https:${show.large_screenshot}`}
                width={200}
                height={200}
              />
              <div className="flex flex-col">
                <h1 className="font-sm font-Ubuntu">Title: {show.title}</h1>
                <span className="font-xs text-gray-200">
                  Filename: {show.filename}
                </span>
              </div>
              <div>
                <p>{(show.size_bytes % 1024) % 1024}</p>
              </div>
              <Link href={show.magnet_url}>
                <a>
                  <FontAwesomeIcon icon={faMagnet} />
                </a>
              </Link>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../layouts';
import Header from '../../../components/header';
import Footer from '../../../components/footer';

import { useEffect } from 'react';

const Page = ({ swagId }) => {
  const imageUrl = `https://thehoya.com/wp-content/uploads/2019/09/19.09.13_usnews_GeorgetownUniversityInstagram.png`;

  // Precache the generated tshirt on the next page
  useEffect(() => {
    if (swagId) {
      let img = new Image();
      img.src = `/api/shirt_mockup?swag=${swagId}`;
    }
  }, [swagId]);

  return (
    <Layout>
      <Head>
        <title>Bill Clinton Swag</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@thmsmlr" />
        <meta property="og:title" content="Bill Clinton Swag" />
        <meta property="og:description" content="I did not have sexual relations, for the record" />
        <meta property="og:image" content={imageUrl} />
      </Head>
      <div className="py-12 px-2 md:px-4 lg:px-6 max-w-screen-xl flex flex-col items-center mx-auto">
        <Header />
        <div className="grid gap-4 mt-8">
          <img src={imageUrl} />
          <Link href={`/shop?swag=${swagId}`}>
            <button className="text-white bg-blue-900 p-3 text-lg font-bold sticky bottom-0">
              Shop
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

Page.getInitialProps = async ({ res, query: { swagId } }) => {
  if (res) {
    res.setHeader('Cache-Control', 's-maxage=31449600, stale-while-revalidate');
  }

  return {
    swagId
  };
};

export default Page;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import getHomeImages from '@/app/api/images';
import styles from './styles.css';
import Image from 'next/image';


const HomePage = async () => {
  const mockImages = await getHomeImages()
 
  return (

    <div >
      <div className="text-5xl font-bold text-center bg-[#f7f7f8] p-3 text-gray-400">GALLERY</div>
      <div className="masonry grid gap-4 md:grid-cols-3 bg-[#f7f7f8] p-10">
        {mockImages.map((image, index) => (
          <div key={image.id} className="relative m-4">
            <Link href={`/photos/${image.id}`}>
              <Image
                src={image.copy_img}
                alt={`Image ${index}`}
                className="w-full h-full object-cover"
                loading='lazy'
                height={100}
                width={1000}
              />

             

              <div className="icon-overlay">
                <button className="overlay-icon" style={{

                }}>
                  <FontAwesomeIcon
                    icon={faDownload}
                    style={{
                      fontSize: '5px',
                      color: '45c7eb',
                      cursor: 'pointer',
                      position: 'absolute',
                      bottom: '10px',
                      left: '400px',
                      right: '10px',

                    }}

                  />
                </button>

              </div>
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
};

export default HomePage;








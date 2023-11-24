import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Header from '@/app/components/header/Header';
import getCatImages from '@/app/api/catimage';
import DownloadButton from '@/app/components/button/Button';
import Image from 'next/image';

const Category = async ({  params: { id } }) => {

  // const currentPage = parseInt(searchParams?.page, 10) || 1;
  // const totalPages = Math.ceil(category.count);
  
  const mockImages = await getCatImages(id)
  // console.log(mockImages)



  try {
    (!mockImages)

    // Check if no data was found
    if (mockImages.length === 0) {
      return <>
      {/* <Header /> */}
        <div className="flex flex-col items-center justify-center  custom-height bg-[#f7f7f8]">
          <div className="text-3xl font-bold text-red-500 mb-2">Not Found</div>
          <Link className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700" href="/">
            Back to Home Page
          </Link>
        </div></>
        ;
      // You can also throw an error or handle the "not found" case in another way
    } else {
      // Data was found, you can proceed with it
      // ... your code to process the data
    }
  } catch (error) {
    // Handle any errors that may occur during the getCatImages(id) function call
    console.error("An error occurred:", error);
  }

  const categoryName = mockImages[0]?.category;
 
 


  return (
    <>
     
   

      <div className="masonry grid gap-4 md:grid-cols-3  bg-[#f7f7f8]  ">
        {/* {mockImages[0] && mockImages[0].image_cat && Array.isArray(mockImages[0].image_cat) && mockImages[0].image_cat.map((image, index) => { */}
        {mockImages.map((image, index) => {



          return (

            <div
              key={image.id}
              className='relative m-4  '   >
               
              <Link href={`/photos/${image.id}`}  >
                <Image height={100} width={1000} src={image.copy_img} alt={`Image ${index}`} className="w-full h-full object-cover  " />
                <div className='absolute top-40   text-white inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 '>
        <p className="image-name">{image.name}</p>

                 <div className="icon-overlay ">
                  <button className="overlay-icon" style={{

                  }}>
                    <FontAwesomeIcon
                      icon={faDownload}
                      style={{
                        fontSize: '25px',
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
                </div>
                </Link>
             
            </div>
          );
        })}
      </div>

  

    </>

  )
}

export default Category


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Header from '@/app/components/header/Header';
import getVideoImages from '@/app/api/videocat';



const Category = async ({  params: { id } }) => {

  // const currentPage = parseInt(searchParams?.page, 10) || 1;
  // const totalPages = Math.ceil(category.count);
  
  const mockVideo = await getVideoImages(id)
  // console.log(mockVideo)


  try {
    (!mockVideo)

    // Check if no data was found
    if (mockVideo.length === 0) {
      return <>
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

  const categoryName = mockVideo[0]?.video_category;


  return (
    <>
      {/* <Header /> */}
     
      {/* <h1 className="text-5xl text-center text-gray-600 font-titleFont font-bold bg-[#f7f7f8] p-2  ">
        {categoryName}
      </h1> */}

      <div className="masonry grid gap-4 md:grid-cols-3  bg-[#f7f7f8] p-10 ">
        {/* {mockImages[0] && mockImages[0].image_cat && Array.isArray(mockImages[0].image_cat) && mockImages[0].image_cat.map((image, index) => { */}
        {mockVideo.map((video, index) => {



          return (

            <div
              key={video.id}
              className='relative m-4 '   >
              <Link href={`/video/${video.id}`}  >
              <video src={video.video} alt={`Image ${index}`} controls   controlsList="nodownload"   autoPlay={false}   className="w-full h-full object-cover" />

              


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
                        bottom: '230px',
                        // left: '400px',
                        // right: '10px',
                        right: '400px',
                        left: '10px',

                      }}
                    />
                  </button>
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


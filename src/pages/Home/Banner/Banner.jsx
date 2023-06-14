import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/01.jpg';
import img2 from '../../../assets/02.jpg';
import img3 from '../../../assets/03.jpg';
import img4 from '../../../assets/04.jpg';

const Banner = () => {
  return (
    <Carousel showThumbs={false}>
      <div>
        <img src={img1} />
        <div className="absolute text-center flex flex-col items-center justify-center transform -translate-y-1/2 left-5 right-5 top-1/2">
          <div className="text-white sm:mt-32 bg-opacity-25 bg-black p-10 rounded-full">
            <h2 className="text-2xl font-bold sm:text-5xl">Join Our Summer Camp!</h2>
            <p className="my-8 text-xs md:text-base  sm:my-8">
              Experience the best summer camp for your kids. Exciting activities, learning, and lots of fun!
            </p>
            <button className="btn btn-primary px-8 py-2 btn-xs sm:btn-sm md:btn-md lg:btn-lg">Join Now</button>
          </div>
        </div>
      </div>
      <div>
        <img src={img2} />
        <div className="absolute text-center flex flex-col items-center justify-center transform -translate-y-1/2 left-5 right-5 top-1/2">
          <div className="text-white sm:mt-32 bg-opacity-25 bg-black p-10 rounded-full">
            <h2 className="text-2xl font-bold sm:text-5xl">Join Our Summer Camp!</h2>
            <p className="my-8 text-xs md:text-base  sm:my-8">
              Experience the best summer camp for your kids. Exciting activities, learning, and lots of fun!
            </p>
            <button className="btn btn-primary px-8 py-2 btn-xs sm:btn-sm md:btn-md lg:btn-lg">Join Now</button>
          </div>
        </div>
      </div>
      <div>
        <img src={img3} />
        <div className="absolute text-center flex flex-col items-center justify-center transform -translate-y-1/2 left-5 right-5 top-1/2">
          <div className="text-white sm:mt-32 bg-opacity-25 bg-black p-10 rounded-full">
            <h2 className="text-2xl font-bold sm:text-5xl">Join Our Summer Camp!</h2>
            <p className="my-8 text-xs md:text-base  sm:my-8">
              Experience the best summer camp for your kids. Exciting activities, learning, and lots of fun!
            </p>
            <button className="btn btn-primary px-8 py-2 btn-xs sm:btn-sm md:btn-md lg:btn-lg">Join Now</button>
          </div>
        </div>
      </div>
      <div>
        <img src={img4} />
        <div className="absolute text-center flex flex-col items-center justify-center transform -translate-y-1/2 left-5 right-5 top-1/2">
          <div className="text-white sm:mt-32 bg-opacity-25 bg-black p-10 rounded-full">
            <h2 className="text-2xl font-bold sm:text-5xl">Join Our Summer Camp!</h2>
            <p className="my-8 text-xs md:text-base  sm:my-8">
              Experience the best summer camp for your kids. Exciting activities, learning, and lots of fun!
            </p>
            <button className="btn btn-primary px-8 py-2 btn-xs sm:btn-sm md:btn-md lg:btn-lg">Join Now</button>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;

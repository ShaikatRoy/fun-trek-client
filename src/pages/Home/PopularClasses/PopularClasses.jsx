import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import 'sweetalert2/dist/sweetalert2.css';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../Layout/SectionTitle';

const PopularClasses = () => {
  const [popularClasses, setPopularClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    fetchPopularClasses();
  }, []);

  const fetchPopularClasses = async () => {
    try {
      const response = await axiosSecure.get('/classes');
      const sortedClasses = response.data.sort((a, b) => b.availableSeats - a.availableSeats);
      const topClasses = sortedClasses.slice(0, 6);
      setPopularClasses(topClasses);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="container mx-auto">
      <SectionTitle
                heading="Popular Classes"
            ></SectionTitle>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularClasses.map((classItem) => (
            <motion.div
              key={classItem._id}
              className="card bg-base-100 shadow-xl rounded-lg overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <figure>
                <motion.img
                  src={classItem.classImage}
                  alt={classItem.className}
                  className="w-full h-48 object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </figure>
              <motion.div
                className="card-body p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="card-title text-lg font-semibold mb-2">{classItem.className}</h2>
                <p className="mb-2 font-semibold">Available Seats: {classItem.seat}</p>
                <p className="mb-2 font-semibold">Instructor: {classItem.name}</p>
                <p className="mb-2 font-semibold">Price: {classItem.price}</p>
                <button className="btn btn-primary">Enroll Now</button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularClasses;

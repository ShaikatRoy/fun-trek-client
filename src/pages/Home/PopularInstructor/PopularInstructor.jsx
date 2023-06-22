import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../../Layout/SectionTitle';

const PopularInstructors = () => {
  const [popularInstructors, setPopularInstructors] = useState([]);
  const [loading] = useState(false);

  useEffect(() => {
    fetch("https://fun-trek-server.vercel.app/instructors")
      .then(res => res.json())
      .then(data => {
        setPopularInstructors(data.slice(0, 6));
      });
  }, []);

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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
      },
    },
  };

  return (
    <div className="container mx-auto">
      <SectionTitle heading="Popular Instructors" />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {popularInstructors.map((instructor) => (
            <motion.div
              key={instructor._id}
              className="card bg-base-100 shadow-xl rounded-lg overflow-hidden flex flex-col items-center justify-center"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <figure>
                <motion.img
                  src={instructor.photo}
                  alt={instructor.name}
                  className="w-full h-48 object-cover rounded-full"
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                />
              </figure>
              <motion.div
                className="card-body p-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="card-title text-lg font-semibold mb-2">{instructor.name}</h2>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularInstructors;

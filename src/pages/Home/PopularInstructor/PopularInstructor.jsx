import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../../Layout/SectionTitle';

const PopularInstructors = () => {
  const [popularInstructors, setPopularInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularInstructors();
  }, []);

  const fetchPopularInstructors = async () => {
    try {
      const response = await fetch('/instructors');
      if (!response.ok) {
        throw new Error('Failed to fetch instructors');
      }
      const data = await response.json();
      const sortedInstructors = data.sort((a, b) => b.students - a.students);
      const topInstructors = sortedInstructors.slice(0, 6);
      setPopularInstructors(topInstructors);
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
      <SectionTitle heading="Popular Instructors" />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {popularInstructors.map((instructor) => (
            <motion.div
              key={instructor._id}
              className="card bg-base-100 shadow-xl rounded-lg overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <figure>
                <motion.img
                  src={instructor.photo}
                  alt={instructor.name}
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
                <h2 className="card-title text-lg font-semibold mb-2">{instructor.name}</h2>
                <p className="mb-2 font-semibold">Students: {instructor.students}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularInstructors;

import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PopularInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    fetchPopularInstructors();
  }, []);

  const fetchPopularInstructors = async () => {
    try {
      const response = await axiosSecure.get('/instructors');
      const sortedInstructors = response.data.sort((a, b) => b.seats - a.seats);
      const topInstructors = sortedInstructors.slice(0, 6);
      setInstructors(topInstructors);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Popular Instructors</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {instructors.map((instructor) => (
            <div key={instructor.id} className="card bg-base-100 shadow-xl rounded-lg overflow-hidden flex flex-col items-center">
              <figure>
                <img
                  src={instructor.photo}
                  alt={instructor.name}
                  className="w-48 h-48 rounded-full object-cover mt-4"
                />
              </figure>
              <div className="card-body p-4 flex flex-col items-center">
                <h2 className="card-title text-lg font-semibold mb-2">{instructor.name}</h2>
                <p className="mb-2 font-semibold">{instructor.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularInstructors;

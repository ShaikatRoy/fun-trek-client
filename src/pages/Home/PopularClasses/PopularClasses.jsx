import { useState, useEffect } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

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

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Popular Classes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularClasses.map((classItem) => (
            <div key={classItem._id} className="card bg-base-100 shadow-xl rounded-lg overflow-hidden">
              <figure>
                <img
                  src={classItem.classImage}
                  alt={classItem.className}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold mb-2">{classItem.className}</h2>
                <p className="mb-2 font-semibold">Available Seats: {classItem.availableSeats}</p>
                <p className="mb-2 font-semibold">Instructor: {classItem.name}</p>
                <p className="mb-2 font-semibold">Price: {classItem.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularClasses;

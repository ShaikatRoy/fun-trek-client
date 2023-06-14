import { useState, useEffect } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axiosSecure.get('/classes');
      setClasses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching classes:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Classes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : classes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {classes.map((classItem) => (
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
                <p className="mb-2 font-semibold">Instructor Name: {classItem.name}</p>
                <p className="mb-2 font-semibold">Instructor Email: {classItem.email}</p>
                <p className="mb-2 font-semibold">Total Enrolled Students: {classItem.enrolledStudents}</p>
                <p className="mb-2 font-semibold">Status: {classItem.status}</p>
                {classItem.status === 'denied' && (
                  <div>
                    <h3 className="font-semibold">Feedback:</h3>
                    <p>{classItem.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No classes found.</p>
      )}
    </div>
  );
};

export default MyClasses;

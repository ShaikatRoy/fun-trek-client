import { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    fetchClasses();
    checkUserRoles();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axiosSecure.get('/classes');
      setClasses(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const checkUserRoles = () => {
    const userRoles = localStorage.getItem('userRoles');
    setIsLoggedIn(!!userRoles);

    if (userRoles) {
      const roles = JSON.parse(userRoles);
      setIsAdmin(roles.includes('admin'));
      setIsInstructor(roles.includes('instructor'));
    }
  };

  const handleSelectClass = (classId) => {
    if (!isLoggedIn) {
      alert('Please log in before selecting a course.');
      return;
    }

    const selectedClass = classes.find((classItem) => classItem._id === classId);
    if (!selectedClass) return;

    if (selectedClass.availableSeats === 0) {
      alert('No available seats for this class.');
      return;
    }

    if (isAdmin || isInstructor) {
      alert('You cannot select a course as an admin or instructor.');
      return;
    }

    // Handle the logic for selecting the class (e.g., redirect to a booking page)
    // ...
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Classes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {classes.map((classItem) => (
            <div
              key={classItem._id}
              className={`card bg-base-100 ${classItem.availableSeats === 0 ? 'bg-red-500' : ''}`}
            >
              <figure>
                <img
                  src={classItem.classImage}
                  alt={classItem.className}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold mb-2">{classItem.className}</h2>
                <p className="mb-2">Instructor Name: {classItem.name}</p>
                <p className="mb-2">Available Seats: {classItem.availableSeats}</p>
                <p className="mb-2">Price: {classItem.price}</p>
                <div className="flex justify-end mt-4">
                  <button className='btn btn-primary'>Add to cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Classes;

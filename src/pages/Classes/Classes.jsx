import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCart from '../../hooks/useCart';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const [refetch] = useCart();
  const { user } = useAuth();
  const location = useLocation();


  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axiosSecure.get('/classes');
      const approvedClasses = response.data.filter((classItem) => classItem.status === 'approved');
      setClasses(approvedClasses);
    } catch (error) {
      console.error('Failed to fetch classes:', error);
    }
  };
  

  const handleSelect = async (classItem) => {
    console.log(classItem);
    if(user && user.email){
        const cartItem = {classId: classItem._id,
                          className: classItem.className,
                          image: classItem.classImage,
                          price: classItem.price,
                          email: user.email
                        }
                        console.log(cartItem);
        fetch('https://vercel.com/shaikatroy/fun-trek-server/carts', {
            method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(cartItem),
              
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'class added on the cart.',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    } else {
        Swal.fire({
            title: 'Please login to book a class',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login now!'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login', {state: {from: location}})
            }
          })
          
    }
    
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Classes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {classes.map((classItem) => (
          <div key={classItem._id} className="card shadow-xl">
            <figure>
              <img
                src={classItem.classImage}
                alt={classItem.className}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{classItem.className}</h2>
              <p>Instructor: {classItem.instructorName}</p>
              <p>Price: ${classItem.price}</p>
              <p>User Email: {classItem.userEmail}</p>
              <button
                className="btn btn-primary"
                onClick={() => handleSelect(classItem)}
                disabled={classItem.availableSeats === 0 || user?.role === 'admin' || user?.role === 'instructor'}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;

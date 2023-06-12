import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/classes');
      setClasses(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateClassStatus = async (classId, status) => {
    try {
      await axios.patch(`http://localhost:5000/classes/${classId}/status`, { status });
      setClasses((prevClasses) =>
        prevClasses.map((c) => {
          if (c._id === classId) {
            return { ...c, status };
          }
          return c;
        })
      );
      Swal.fire({
        icon: 'success',
        title: `Class ${classId} has been ${status}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const sendFeedback = async (classId) => {
    const { value: feedback } = await Swal.fire({
      title: 'Send Feedback',
      input: 'textarea',
      inputLabel: 'Feedback',
      inputPlaceholder: 'Type your feedback here...',
      inputAttributes: {
        'aria-label': 'Feedback',
      },
      showCancelButton: true,
      confirmButtonText: 'Send',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      preConfirm: async (text) => {
        try {
          await axios.post(`http://localhost:5000/classes/${classId}/feedback`, { feedback: text });
          Swal.fire({
            icon: 'success',
            title: 'Feedback Sent',
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while sending feedback!',
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (feedback) {
      // Do something with the feedback
      console.log(feedback);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Manage Classes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {classes.map((classItem) => (
            <div key={classItem._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={classItem.classImage}
                  alt={classItem.className}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg font-bold mb-2">{classItem.className}</h2>
                <p className="mb-2">Instructor Name: {classItem.name}</p>
                <p className="mb-2">Instructor Email: {classItem.email}</p>
                <p className="mb-2">Available Seats: {classItem.seat}</p>
                <p className="mb-2">Price: {classItem.price}</p>
                <p className="mb-2">Status: {classItem.status}</p>
                <div className="flex justify-end mt-4">
                  {classItem.status === 'pending' && (
                    <>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => updateClassStatus(classItem._id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => updateClassStatus(classItem._id, 'denied')}
                      >
                        Deny
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-accent ms-2"
                    onClick={() => sendFeedback(classItem._id)}
                  >
                    Send Feedback
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageClasses;

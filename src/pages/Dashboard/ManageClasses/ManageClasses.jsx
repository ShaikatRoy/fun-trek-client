import { useState, useEffect } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../Layout/SectionTitle';

const ManageClasses = () => {
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
      console.error(error);
    }
  };

  const updateClassStatus = async (classId, status) => {
    try {
      await axiosSecure.patch(`/classes/${classId}/status`, { status });

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
    try {
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
            const response = await axiosSecure.post(`/classes/${classId}/feedback`, { feedback: text });
            if (response.status === 201) {
              return true; 
            }
          } catch (error) {
            console.error(error);
            Swal.showValidationMessage(`Failed to send feedback: ${error}`);
            return false; 
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (feedback) {
        Swal.fire({
          icon: 'success',
          title: 'Feedback Sent',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
   <>
   <SectionTitle
                heading="Manage Class"
            ></SectionTitle>
    <div className="container mx-auto">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                <p className="mb-2 font-semibold">Available Seats: {classItem.seat}</p>
                <p className="mb-2 font-semibold">Price: {classItem.price}</p>
                <p className="mb-2 font-semibold">Status: {classItem.status}</p>
                <div className="flex justify-end mt-4">
                  {classItem.status === 'pending' && (
                    <>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => updateClassStatus(classItem._id, 'approved')}
                        disabled={classItem.status !== 'pending'}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => updateClassStatus(classItem._id, 'denied')}
                        disabled={classItem.status !== 'pending'}
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
   </>
  );
};

export default ManageClasses;

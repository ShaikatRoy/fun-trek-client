import { useState, useEffect } from 'react';

const InstructorsPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("https://fun-trek-server.vercel.app/instructors")
    .then(res=>res.json())
    .then(data=>{setInstructors(data)
    setLoading(false)
    })

  }, []);

console.log(instructors)
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Instructors</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {instructors.map((instructor) => (
            <div key={instructor._id} className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img src={instructor.photo} alt={instructor.name} className='w-48 rounded-lg'/>
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {instructor.name}
                  <div className="badge badge-secondary">Instructor</div>
                </h2>
                <p>Email: {instructor.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstructorsPage;

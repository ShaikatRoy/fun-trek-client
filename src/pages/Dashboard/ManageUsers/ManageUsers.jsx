import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../Layout/SectionTitle";

const ManageUsers = () => {
    const [ axiosSecure] = useAxiosSecure();
    const {data: users = [], refetch} = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })

    const  handleMakeAdmin = user => {
        fetch(`https://fun-trek-server.vercel.app/users/admin/${user._id}`,{
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    const handleMakeInstructor = user => {
        fetch(`https://fun-trek-server.vercel.app/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: `${user.name} is an Instructor Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    return (
    
        <div>
          <SectionTitle
    heading="Manage Users "
></SectionTitle>
            <Helmet>
                <title>Fun Trek | All Users</title>
            </Helmet>
           <h3 className="text-3xl font-semibold">Total users: {users.length}</h3>
           <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Photo</th>
        <th>Name</th>
        <th>Email</th>
        <th className="text-center">Role</th>
        
      </tr>
    </thead>
    <tbody>
      {
        users.map((user, index) =>  <tr key={user._id}>
            <td>{index + 1}</td>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={user?.photo} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
              </div>
            </td>
            <td> {user.name}</td>
            <td>{user.email}</td>
            <td>
             {
                user.role === 'instructor' ? 'instructor' :
                <button onClick={() => handleMakeInstructor(user)} 
                className="btn btn-ghost bg-blue-500 text-white me-3">make instructor</button>
              }
              {
                user.role === 'admin' ? 'admin' :
                <button onClick={() => handleMakeAdmin(user)} 
                className="btn btn-ghost bg-green-500 text-white ms-3">make admin</button>
              }

            </td>
            <td>

            </td>
          </tr> )
      }
     
    </tbody>
    
    
  </table>
</div>
        </div>
    );
};

export default ManageUsers;
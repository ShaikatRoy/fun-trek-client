import { Link } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";

const SelectedClass = () => {
  const [cart, setCart, refetch] = useCart();

  const handleDelete = item => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/carts/${item._id}`,{
            method: 'DELETE',
          })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
                refetch();
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                'success'
                )
            }
          })
        }
      })
  };

  const handlePay = () => {
   
    setCart([]);
  };

  return (
    <>
       <div>
       <h2 className="text-3xl">Total classes: {cart.length}</h2>
       </div>

       <div className="w-full">
    {cart.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Class Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.classId}>
                <td>
                  <img src={item.image} alt={item.className} className="w-16 h-16" />
                </td>
                <td>{item.className}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    className="btn btn-sm btn-red"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                  <Link to="/dashboard/payment">
                  <button
                    className="btn btn-sm btn-primary ml-2"
                    onClick={handlePay}
                  >
                    Pay
                  </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No classes selected.</p>
      )}
    </div>
    </>
    
  );
};

export default SelectedClass;

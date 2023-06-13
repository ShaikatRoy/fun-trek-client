import useCart from "../../../hooks/useCart";

const SelectedClass = () => {
  const [cart, setCart] = useCart();

  const handleDelete = (classId) => {
    // Remove the class from the cart
    const updatedCart = cart.filter((item) => item.classId !== classId);
    setCart(updatedCart);
  };

  const handlePay = () => {
    // Perform payment processing logic
    // ...

    // Clear the cart after successful payment
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
                    onClick={() => handleDelete(item.classId)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-primary ml-2"
                    onClick={handlePay}
                  >
                    Pay
                  </button>
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

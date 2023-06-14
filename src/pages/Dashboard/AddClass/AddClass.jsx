
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';

const AddClass = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const saveClass = {
      className: data.className,
      classImage: data.classImage,
      name: data.name,
      email: data.email,
      seat: parseFloat(data.seat),
      price: parseFloat(data.price),
      status: 'pending'
    };
  
    const token = localStorage.getItem('access-token');
    console.log('Token:', token);
  
    fetch('https://fun-trek-server.vercel.app/classes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(saveClass),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        reset();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mx-5">
          <label className="label mx-5">
            <span className="label-text">Class Name</span>
          </label>
          <input
            type="text"
            placeholder="class name"
            className="input input-bordered w-full mx-5"
            {...register('className', { required: true })}
          />
        </div>
        <div className="form-control w-full mx-5">
          <label className="label mx-5">
            <span className="label-text">Class Image</span>
          </label>
          <input
            type="text"
            placeholder="input image url"
            className="input input-bordered w-full mx-5"
            {...register('classImage', { required: true })}
          />
        </div>
        <div className="form-control w-full mx-5">
          <label className="label mx-5">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            defaultValue={user?.displayName}
            readOnly
            placeholder="name"
            className="input input-bordered w-full mx-5"
            {...register('name', { required: true })}
          />
        </div>
        <div className="flex">
          <div className="form-control w-full mx-5">
            <label className="label mx-5">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              defaultValue={user?.email}
              readOnly
              placeholder="email"
              className="input input-bordered w-full mx-5"
              {...register('email', { required: true })}
            />
          </div>
          <div className="form-control w-full ms-5">
            <label className="label ">
              <span className="label-text">Seat</span>
            </label>
            <input
              type="text"
              placeholder="seat"
              className="input input-bordered w-full "
              {...register('seat', { required: true })}
            />
          </div>
        </div>
        <div className="form-control w-full mx-5">
          <label className="label mx-5">
            <span className="label-text">Price</span>
          </label>
          <input
            type="text"
            placeholder="price"
            className="input input-bordered w-full mx-5"
            {...register('price', { required: true })}
          />
        </div>
        <input type="submit" className="flex btn btn-outline mx-auto my-3" value="Submit" />
      </form>
    </div>
  );
};

export default AddClass;

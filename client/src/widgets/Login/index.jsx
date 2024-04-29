import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import validateManyFields from '../../validations';
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from '../../hooks/useAuthProvider';
// import { postLoginData } from '../redux/actions/authActions';
import { Input, Loader } from '../../components';

const Login = () => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { loading, user, loginAction } = useAuth();//;
  const navigate = useNavigate();



  const handleChange = e => {
    setFormErrors({});
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("login", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }
    loginAction({
      username: formData.email,
      password: formData.password
    })
  }



  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
      <form className='m-auto my-16 max-w-[500px] bg-white p-8 border-2 shadow-md rounded-md'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className='text-center mb-4'>Welcome to Task Management, please login here</h2>
            <div className="mb-4">
              <label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">Email</label>
              <Input type="text" name="email" id="email" value={formData.email} placeholder="youremail@domain.com" onChange={handleChange} />
              {fieldError("email")}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="after:content-['*'] after:ml-0.5 after:text-red-500">Password</label>
              <Input type="password" name="password" id="password" value={formData.password} placeholder="Your password.." onChange={handleChange} />
              {fieldError("password")}
            </div>

            <button className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark' onClick={handleSubmit}>Submit</button>

            <div className='pt-4'>
              <p>Login with : username: <b>admin@tm.com</b> and password: <b>admin</b></p>
            </div>
          </>
        )}
      </form>
    </>
  )
}

export default Login
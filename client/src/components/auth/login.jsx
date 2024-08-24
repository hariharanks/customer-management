import { login } from "../api/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/authContext';

const Login = (() => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { saveToken } = useAuth();
  const onSubmit = async (data) => {
    const result = await login(data);
    if (result) {
      const { jwtToken, name } = result;
      saveToken(jwtToken);
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('loggedInUser', name);
      localStorage.setItem('isLoggedIn', true);
      setTimeout(()=>{
        navigate('/home');
      },1000)
      toast.success(result.message);
    } else {
      toast.error('Failed to update');
    }
  }

  const errorDisplay = (id, msg) => {
    toast.error(msg, {
      toastId: id,
    });
  }

  return (
    <>
      <div className="login-container login-background">
        <div className="wrapper left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Welcome back!</h1>
            <div className="input-box">
              <input
                id='1'
                className="text-box w-100p"
                type="text"
                placeholder="Email"
                name="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address'
                  }
                })}
              />
              <i className='bx bxs-user'></i>
              {errors.email && <span className='error'>{errorDisplay(2, errors.email.message)}</span>}
            </div>
            <div className="input-box">
              <input
                id='2'
                className="text-box w-100p"
                type="password"
                placeholder="Password"
                name="password"
                required
                {...register('password', { required: 'Password is required' })}
              />
              <i className='bx bxs-lock-alt' ></i>
              {errors.password && <span className='error'>{errorDisplay(2, errors.password.message)}</span>}
            </div>

            <div className="input-box space-between">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <div className="input-box">
              <button className="btn green" type="submit">Login</button>
            </div>
            <div className="register-link">
              <p>Don't have an account? <br /> <a href="">Register</a></p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
});

export default Login
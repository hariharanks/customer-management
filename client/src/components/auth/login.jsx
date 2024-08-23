const Login = (() => {

  return (
    <>
      <div className="container">
        <div className="wrapper center">
          <form action="">
            <h1>Welcome back!</h1>
            <div className="input-box">
              <input className="text-box w-100p" type="text" placeholder="Username" required />
              <i className='bx bxs-user'></i>
            </div>

            <div className="input-box">
              <input className="text-box w-100p" type="password" placeholder="Password" required />
              <i className='bx bxs-lock-alt' ></i>
            </div>

            <div className="input-box space-between">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <div className="input-box">
              <button className="btn" type="submit">Login</button>
            </div>
            <div className="register-link">
              <p>Don't have an account? <br /> <a href="">Register</a></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
});

export default Login
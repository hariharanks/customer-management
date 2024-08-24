import { useNavigate } from "react-router-dom";
import Search from './SearchBar';
import { logout } from "../api/auth";
import { useAuth } from '../context/authContext';

const Header = ({ query, setQuery }) => {
  const navigate = useNavigate();
  const { clearToken } = useAuth();

  const redirect = (id) => {
    navigate(`/add`);
  }

  const handleLogout = () => {
    clearToken();
    logout();
    navigate('/login');
  }
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;
  const loggedInUser = localStorage.getItem('loggedInUser');
  console.log("isLoggedIn======", isLoggedIn);

  return (
    <header>
      <nav>
        <div className="container">
          <a style={{ color: '#000' }} href="/">Customer Register</a>
          <Search query={query} setQuery={setQuery} />
          <ul className="nav right">
            <button className="btn green" onClick={() => redirect()}><i className="fa fa-plus"></i> Create Customer</button>
            {isLoggedIn &&
              <>
                <a style={{ color: '#000', alignContent: 'center' }} href="/">Hi, {loggedInUser}</a>
                <button className="btn red" onClick={() => handleLogout()}><i className=""></i> Logout</button>
              </>
            }
          </ul>
        </div>
      </nav>
    </header>
  )
};
export default Header;
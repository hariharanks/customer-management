import { useNavigate } from "react-router-dom";
import Search from './SearchBar';


const Header = ({ query, setQuery }) => {
  const navigate = useNavigate();

  const redirect = (id) => {
    navigate(`/add`);
  }

  return (
    <header>
        <nav>
          <div className="container">
            <a href="/">Customer Register</a>
            <Search query={query} setQuery={setQuery}/>
            <ul className="nav right">
            <button className="btn" onClick={()=>redirect()}><i className="fa fa-plus"></i> Create Customer</button>
            </ul>
          </div>
        </nav>
    </header>
  )
};
export default Header;
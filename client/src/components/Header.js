import { useNavigate } from "react-router-dom";
import Search from './utils/SearchBar';


const Header = ({ query, setQuery }) => {
  const navigate = useNavigate();

  const redirect = (id) => {
    navigate(`/add`);
  }

  return (
    <header>
        <nav>
          <div class="container">
            <a href="javascript:0">Customer Register</a>
            <Search query={query} setQuery={setQuery}/>
            <ul class="nav right">
            <button class="btn" onClick={()=>redirect()}><i class="fa fa-plus"></i> Create Customer</button>
            </ul>
          </div>
        </nav>
    </header>
  )
};
export default Header;
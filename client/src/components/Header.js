import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();

  const redirect = (id) => {
    navigate(`/add`);
  }

  return (
    <header>
        <nav>
          <div class="container">
            <a href="javascript:0">Customer Register</a>
            <ul class="nav right">
            <button class="btn" onClick={()=>redirect()}><i class="fa fa-plus"></i> Create Customer</button>
            </ul>
          </div>
        </nav>
    </header>
  )
};
export default Header;
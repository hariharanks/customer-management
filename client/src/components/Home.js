import CustomerList from "./CustomerList"
import Header from "./Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className='main'>
        <CustomerList />
      </div>
    </>
  )
}
export default Home;
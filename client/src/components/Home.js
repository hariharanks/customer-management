import CustomerList from "./CustomerList"


const Home = ({ query }) => {
  return (
    <>
      <div className='main'>
        <CustomerList query={query}/>
      </div>
    </>
  )
}
export default Home;
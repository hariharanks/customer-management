import { useState } from "react";
import CustomerList from "./CustomerList";
import Header from "./utils/Header";

const Home = () => {
  const [query, setQuery] = useState('');
  return (
    <>
    <Header query={query} setQuery={setQuery} />
      <div className='main'>
        <CustomerList query={query}/>
      </div>
    </>
  )
}
export default Home;
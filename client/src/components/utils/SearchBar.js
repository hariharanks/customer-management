const Search = ({ query, setQuery }) => {
  return (
    <div className="search">
      <input
        type="text"
        className="text-box w-20"
        placeholder="Search for Name / Phone number"
        value={query}
        onChange={(e) => { 
          e.preventDefault() 
          setQuery(e.target.value) 
        }}
      />
    </div>
  );
};
export default Search;
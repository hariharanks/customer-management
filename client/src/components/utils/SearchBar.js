const Search = ({ query, setQuery }) => {
  return (
    <div className="search">
      <input
        type="text"
        className="text-box w-20"
        placeholder="What are you looking for?"
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
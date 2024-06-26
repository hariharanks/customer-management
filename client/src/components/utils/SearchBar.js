const Search = ({ query, setQuery }) => {
  return (
    <div class="search">
      <input type="text" class="text-box w-20" placeholder="What are you looking for?" value={query} onChange={(e) => setQuery(e.target.value)}/>
    </div>
  );
};
export default Search;
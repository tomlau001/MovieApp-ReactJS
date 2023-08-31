/* eslint-disable react/prop-types */
import "./SearchBox.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
const SearchBox = ({
  setSearchParam,
  fetchingSearch,
  fetchTrending,
  searchParam,
  // setPage,
}) => {

  return (
    <div className="search">
      <input
        className="searchBox"
        key="searchBox"
        type="text"
        placeholder="Search by titles..."
        onKeyDown={(e) => {
          e.key === "Enter" && fetchingSearch(searchParam);
        }}
        value={searchParam}
        onChange={(e) => {
          const value = e.target.value;
          setSearchParam(value);
          if (value === "") {
            fetchTrending();
          }
        }}
      />
      <SearchOutlinedIcon
        className="search-icon"
        onClick={() => {
          fetchingSearch(searchParam);
        }}
      />
    </div>
  );
};

export default SearchBox;

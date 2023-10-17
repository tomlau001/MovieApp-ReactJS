/* eslint-disable react/prop-types */
import "./SearchBox.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
const SearchBox = ({
  setIsSearching,
  setSearchParam,
  fetchingSearch,
  searchParam,
  setPage,
}) => {
  return (
    <div className="search">
      <input
        className="searchBox"
        key="searchBox"
        type="text"
        placeholder="Search by titles..."
        onKeyDown={(e) => {
          e.key === "Enter" && (fetchingSearch(searchParam), setPage(1));
        }}
        value={searchParam}
        onChange={(e) => {
          const value = e.target.value;
          setSearchParam(value);
          setIsSearching(value !== "");
          setPage(1);
        }}
      />
      <SearchOutlinedIcon
        className="search-icon"
        onClick={() => {
          fetchingSearch(searchParam);
          setPage(1);
        }}
      />
    </div>
  );
};

export default SearchBox;

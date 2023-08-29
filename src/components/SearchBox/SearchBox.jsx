/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./SearchBox.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
const SearchBox = ({ onSubmit, page ,SetNumOfPages ,setSearchData}) => {
  const API_KEY = `984691a982db0dc62bc0e27ae1c406b2`;
  const [searchParam, setSearchParam] = useState("");

  const fetchingSearch = async (param) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${param}&page=${page}`
    );
    const data = await response.json();
    console.log(data);
    setSearchData(data.results);
    SetNumOfPages(data.total_pages)
  };

  useEffect(() => {
    fetchingSearch(searchParam);
  }, [page]);

  const handleGetData = () => {
    onSubmit();
  };

  return (
    <div className="search">
      <input
        className="searchBox"
        key="searchBox"
        type="text"
        placeholder="Search by titles..."
        onKeyDown={(e) => {
          e.key === "Enter" && fetchingSearch(searchParam) && handleGetData();
        }}
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
      />
      <SearchOutlinedIcon
        className="search-icon"
        onClick={() => {
          fetchingSearch(searchParam);
          handleGetData();
          //question
        }}
      />
    </div>
  );
};

export default SearchBox;

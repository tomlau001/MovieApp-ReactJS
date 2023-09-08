/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Pagination as MuiPagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Pagination.css";
import { useEffect, useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function PaginationRounded({ setPage, numOfPages, page }) {
  const [paginationPage, setPaginationPage] = useState(page);

  const handlePageChange = (event, page) => {
    window.scroll(0, 0);
    setPage(page);
    setPaginationPage(page);
  };

  useEffect(() => {
    setPaginationPage(page);
  }, [page]);

  return (
    <ThemeProvider theme={darkTheme}>
      <MuiPagination
        className="pagination"
        size="large"
        count={numOfPages < 500 ? numOfPages : 500}
        shape="rounded"
        page={paginationPage}
        onChange={handlePageChange}
        siblingCount={2}
        hidePrevButton={true}
        hideNextButton={true}
      />
    </ThemeProvider>
  );
}

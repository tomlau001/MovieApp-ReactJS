import { Pagination as MuiPagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Pagination.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// eslint-disable-next-line react/prop-types
export default function PaginationRounded({ setPage, numOfPages }) {
  const handlePageChange = (page) => {
    window.scroll(0, 0)
    setPage(page);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <MuiPagination
        className="pagination"
        size="large"
        count={ numOfPages < 500 ? numOfPages : 500}
        shape="rounded"
        onChange={(e) => handlePageChange(e.target.textContent)}
        siblingCount={1}
      />
    </ThemeProvider>
  );
}

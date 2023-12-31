/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useEffect } from "react";
import "./Genres.css";
import { API_KEY } from "../../config";

const Genres = ({
  type,
  setGenres,
  genres,
  selectedGenres,
  setSelectedGenres,
}) => {
  const handleChange = (e) => {
    setSelectedGenres(e.target.value);
  };

  const fetchGenres = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}`
    );
    const { genres } = await response.json();

    setGenres(genres);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <>
      <FormControl className="genresBox" sx={{ backgroundColor: "#3030308c" }}>
        <InputLabel id="demo-multiple-chip-label" sx={{ color: "#b4b4b499" }}>
          Genres
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedGenres}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selectedGenres) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.25 }}>
              {selectedGenres.map((genre) => (
                <Chip key={genre} label={genre} size="small" />
              ))}
            </Box>
          )}
        >
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.name} sx={{ color: "black" }}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default Genres;

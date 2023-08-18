/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import "./MovieModal.css";
import { Box } from "@mui/material";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Recommendations from "../Recommendations/Recommendations";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "96%",
  bgcolor: "#181818",
  borderRadius: 2,
  textAlign: "center",
  boxShadow: 24,
};

export default function MoiveModal({ children, id, type, date, title }) {
  const API_KEY = `984691a982db0dc62bc0e27ae1c406b2`;
  const [details, setDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchDetails = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`
    );
    const data = await response.json();
    setDetails(data);
  };

  const fetchVideo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}`
    );
    const { results } = await response.json();

    if (results.length > 0) {
      setVideo(results[0].key);
    } else {
      setVideo(null);
    }
    //undefined cause some data may no video
  };

  const {
    backdrop_path,
    genres,
    tagline,
    vote_average,
    overview,
    runtime,
    original_language,
  } = details;

  const minutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  useEffect(() => {
    fetchDetails();
    fetchVideo();
  }, []);

  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {details && (
            <div className="details">
              <div className="img-container">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
                  alt=""
                />
                <CancelSharpIcon className="modal-icon" onClick={handleClose} />
                <Button
                  className="movie-btn"
                  size="small"
                  variant="contained"
                  startIcon={<PlayCircleIcon />}
                  href={`https://www.youtube.com/watch?v=${video}`}
                  target="blank"
                >
                  Trailer
                </Button>
              </div>

              <h2 className="details-title">{title}</h2>

              <div className="modal-container">
                <div className="movie-details">
                  <div className="dateNtime">
                    <span className="light-color">
                      {date && date.substring(0, 4)}
                    </span>
                    <span className="light-color">
                      {runtime ? `${minutesToHours(runtime)}` : ""}
                    </span>
                  </div>

                  <div className="description">
                    <h5 className="tagline">{tagline}</h5>
                    <p>
                      {/* {overview} */}
                      {
                        !overview 
                        ? ` This ${type} does not have any overview information available. `
                        : overview.length > 350
                        ? overview.substring(0, 350) + "..."
                        : overview
                      }
                    </p>
                  </div>
                </div>

                <div className="movie-subinfo">
                  {genres && genres.length > 0 && (
                    <span className="light-color">
                      genres:{" "}
                      <span>{genres.map((g) => g.name).join(", ")}</span>
                      {/* question: join(",") && join(", ")  */}
                    </span>
                  )}
                  {vote_average ? (
                    <p>
                      <span className="light-color">rating: </span>
                      {`${vote_average.toFixed(1)}/10`}
                    </p>
                  ) : (
                    <p>
                      <span className="light-color">rating: </span>
                      No Rating
                    </p>
                  )}
                  <p>
                    <span className="light-color">original language: </span>
                    {`"${original_language}"`}
                  </p>
                </div>
              </div>
              <Recommendations id={id} type={type} />
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

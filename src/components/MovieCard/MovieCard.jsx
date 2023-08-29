/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import "./MovieCard.css";
import MoiveModal from "../Modal/MovieModal";
export default function MovieCard({ type, date, title, poster, id }) {
  const currentYear = new Date().getFullYear().toString();
  return (
    <>
      <MoiveModal poster={poster} id={id} type={type} date={date} title={title}>
        <Card
          className="card"
          sx={{
            minWidth: 210,
            maxWidth: 210,
            backgroundColor: "darkgrey",
            borderRadius: "12px",
          }}
        >
          <CardMedia
            className="card-image "
            sx={{ height: 350 }}
            image={
              poster
                ? `https://image.tmdb.org/t/p/w300/${poster}`
                : "/src/assets/noImgLarge.png"
            }
            title={title}
          />
          <div className="card-content">
            <h2 className="movie-title">{title}</h2>
            <div className="card-subcontent">
              <h5>{type}</h5>
              {date && (
                <p className={date.substring(0, 4) === "2023" ? "latest" : ""}>
                  {date.substring(0, 4) === currentYear
                    ? date.substring(0, 4) + "(latest)"
                    : date.substring(0, 4)}
                </p>
              )}
            </div>
          </div>
        </Card>
      </MoiveModal>
    </>
  );
}

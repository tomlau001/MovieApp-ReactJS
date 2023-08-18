/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import "./MovieCard.css";
import MoiveModal from "../Modal/MoiveModal";

// eslint-disable-next-line react/prop-types
export default function MovieCard({ type, date, title, poster, id }) {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <MoiveModal poster={poster} id={id} type={type} date={date} title={title} >
        <Card className="card" sx={{ minWidth: 210, maxWidth: 210 }}>
          <CardMedia
            className="card-image "
            sx={{ height: 350 }}
            image={`https://image.tmdb.org/t/p/w300/${poster}`}
            title={title}
          />
          <div className="card-content">
            <h2 className="movie-title">{title}</h2>
            <div className="card-subcontent">
              <h5>{type}</h5>
              <p className={date.substring(0, 4) === "2023" ? "latest" : ""}>
                {date.substring(0, 4) === currentYear.toString()
                  ? date.substring(0, 4) + "(latest)"
                  : date.substring(0, 4)}
              </p>
            </div>
          </div>
        </Card>
      </MoiveModal>
    </>
  );
}

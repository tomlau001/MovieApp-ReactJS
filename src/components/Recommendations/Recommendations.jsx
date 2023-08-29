/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Recommendations.css";
import MoiveModal from "../Modal/MovieModal";
import { ThemeProvider, createTheme } from "@mui/material";

const Recommendations = ({ id, type }) => {
  const API_KEY = `984691a982db0dc62bc0e27ae1c406b2`;
  const [recommendations, setRecommendtions] = useState([]);

  const currentYear = new Date().getFullYear();
  // const movieModalRef = useRef();
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: "0",
          },
        },
      },
    },
  });

  // const handleDelete = () => {
  //   if(movieModalRef.current){
  //     movieModalRef.current.remove()
  //   }
  // }

  const fetchRecommend = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${API_KEY}`
    );
    const { results } = await response.json();

    console.log(results.slice(0, 6));
    setRecommendtions(results.slice(0, 6));
  };

  useEffect(() => {
    fetchRecommend();
  }, []);
  return (
    <>
      <h2 style={{ fontSize: "24px", margin: "48px", marginTop: "24px" }}>
        {recommendations.length > 0 ? (
          "Recommedations"
        ) : (
          <hr style={{ opacity: 0.3 }} />
        )}
      </h2>
      <div className="RCM-container">
        {recommendations &&
          recommendations.map(
            ({
              id,
              title,
              backdrop_path,
              overview,
              name,
              first_air_date,
              release_date,
            }) =>
              backdrop_path && (
                <div key={id} className="RCM-card">
                  <ThemeProvider theme={theme}>
                    <MoiveModal type={type} id={id}>
                      <div className="RCM-img-container">
                        <img
                          src={`https://image.tmdb.org/t/p/w300/${backdrop_path}`}
                          alt=""
                          className="RCM-img"
                        />
                      </div>
                    </MoiveModal>
                  </ThemeProvider>
                  <div className="RCM-info">
                    <h2 className="RCM-title">{title || name}</h2>
                    <div className="RCM-subinfo">
                      <p
                        className={
                          "light-color" +
                          " " +
                          ((release_date || first_air_date).substring(0, 4) ===
                          "2023"
                            ? "latest"
                            : "")
                        }
                      >
                        {(release_date || first_air_date).substring(0, 4) ===
                        currentYear.toString()
                          ? (release_date || first_air_date).substring(0, 4) +
                            "(latest)"
                          : (release_date || first_air_date).substring(0, 4)}
                      </p>
                      <p className="light-color">{type}</p>
                    </div>
                    <p className="RCM-overview">
                      {!overview
                        ? "The card for this recommendation does not have any overview information available. However, be prepared to embark on an unforgettable experience filled with gripping storytelling, intriguing themes, and a world that will captivate your imagination."
                        : overview.length > 350
                        ? overview.substring(0, 350) + "..."
                        : overview}
                    </p>
                  </div>
                </div>
              )
          )}
      </div>
    </>
  );
};

export default Recommendations;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Recommendations.css";

const Recommendations = ({ id, type, date }) => {
  const API_KEY = `984691a982db0dc62bc0e27ae1c406b2`;
  const [recommendations, setRecommendtions] = useState([]);

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
    <div>
      <h2 style={{ fontSize: "24px", margin: "48px", marginTop: "24px" }}>
        {recommendations.length > 0 ? "Recommedations" : ""}
      </h2>
      <div className="RCM-container">
        {recommendations &&
          recommendations.map(
            ({ id, title, backdrop_path, overview }) =>
              backdrop_path && (
                <div key={id} className="RCM-card">
                  <div>
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${backdrop_path}`}
                      alt=""
                      className="RCM-img"
                    />
                  </div>
                  <div className="RCM-info">
                    <h2 className="RCM-title">{title}</h2>
                    <div className="RCM-subinfo">
                      <p className="light-color">{date}</p>
                      <p className="light-color">{type}</p>
                    </div>
                    <p className="RCM-overview">
                      { !overview 
                        ? "The card for this recommendation does not have any overview information available. "
                        : overview.length > 350
                        ? overview.substring(0, 350) + "..."
                        : overview}
                    </p>
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default Recommendations;

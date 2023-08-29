import { Button } from "@mui/material";
import "./Notfound.css";
import { useNavigate } from "react-router-dom";


const Notfound = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound">
      <h2>Lost your way?</h2>
      <p>
        Sorry, we can&#39;t find that page. You&#39;ll find lots to explore on
        the home page.
      </p>
      <Button variant="outlined" style={{padding:"16px 24px"}} onClick={() => navigate("Home")}>
        Back to Home Page
      </Button>
    </div>
  );
};

export default Notfound;

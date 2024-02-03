import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <h2 style={{ textAlign: "center", fontSize:"60px" }}>404 Page Not Found</h2>
            <h2 style={{ textAlign: "center" }}><Button> <Link to="/">Go to Main Page</Link></Button></h2>
        </>

    );

}
export default NotFound;
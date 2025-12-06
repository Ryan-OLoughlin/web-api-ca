import { Link } from "react-router";

const StartPage = () => {
  
    return(
        <>
            <p>
                Welcome to Da Movie DB! Do you want to binge some <Link to="/movies">Movies</Link> or view your <Link to="/profile">Profile</Link>?
            </p>
            <p>
                <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to save your create playlists!
            </p>
        </>
    );
  };

export default StartPage;

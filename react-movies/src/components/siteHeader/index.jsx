import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useContext } from "react";
import { AuthContext } from '../../contexts/authContext';
import Box from "@mui/material/Box";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {

  const context = useContext(AuthContext);
  
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Search", path: "/search" },
    { label: "Discover", path: "/discover" },
    { label: "Trending", path: "/movies/trending" },
    { label: "Top Rated", path: "/movies/top-rated" },
    { label: "Upcoming", path: "/movies/upcoming" },
  ];

  const protectedOptions = [
    { label: "Profile", path: "/profile" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Playlists", path: "/playlists" },
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL);
  };
  
  
return (
    <>
      <AppBar position="fixed" color="primary" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
          {/* Left: brand + nav */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="h5"
              sx={{ color: "primary.contrastText", cursor: "pointer", whiteSpace: "nowrap" }}
              onClick={() => navigate("/")}
            >
              DaMovieDB.ie
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              {menuOptions.map((opt) => (
                <Button key={opt.label} color="inherit" onClick={() => handleMenuSelect(opt.path)}>
                  {opt.label}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Right: auth status + protected options */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {context.isAuthenticated ? (
              <>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                  {protectedOptions.map((opt) => (
                  <Button key={opt.label} color="inherit" onClick={() => handleMenuSelect(opt.path)}>
                  {opt.label}
                  </Button>
                  ))}
                </Box>
                <Typography variant="body2" sx={{ color: "primary.contrastText" }}>
                  Welcome {context.userName}!
                </Typography>
                <Button onClick={() => context.signout()} variant="outlined" color="inherit" size="small">
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body2" sx={{ color: "primary.contrastText" }}>
                  You are not logged in
                </Typography>
                <Button onClick={() => navigate("/login")} variant="outlined" color="inherit" size="small">
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;

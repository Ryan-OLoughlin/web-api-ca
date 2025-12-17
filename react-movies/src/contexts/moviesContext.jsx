import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./authContext";
import * as api from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const authContext = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load favorites and playlists from backend when authenticated
  useEffect(() => {
    const loadData = async () => {
      if (!authContext.isAuthenticated || !authContext.authToken) {
        setFavorites([]);
        setPlaylists([]);
        return;
      }
      
      setLoading(true);
      try {
        // Load favorites
        const favs = await api.getFavorites(authContext.authToken);
        setFavorites(favs.map((f) => f.movieId));
        
        // Load playlists
        const lists = await api.getPlaylists(authContext.authToken);
        setPlaylists(lists);
      } catch (error) {
        console.error("Failed to load favorites/playlists:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [authContext.isAuthenticated, authContext.authToken]);

  // --- Favorites API ---
  const addToFavorites = async (movie) => {
    if (!authContext.authToken) {
      console.error("Not authenticated");
      return;
    }
    
    try {
      await api.addFavorite(movie.id, authContext.authToken);
      setFavorites((prev) => {
        if (!prev.includes(movie.id)) return [...prev, movie.id];
        return prev;
      });
    } catch (error) {
      console.error("Failed to add favorite:", error);
    }
  };

  const removeFromFavorites = async (movie) => {
    if (!authContext.authToken) {
      console.error("Not authenticated");
      return;
    }
    
    try {
      await api.removeFavorite(movie.id, authContext.authToken);
      setFavorites((prev) => prev.filter((mId) => mId !== movie.id));
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  // --- Playlists API ---
  const createPlaylist = async (name = "New Playlist") => {
    if (!authContext.authToken) {
      console.error("Not authenticated");
      return null;
    }
    
    try {
      const newPlaylist = await api.createPlaylist(name, authContext.authToken);
      setPlaylists((p) => [...p, newPlaylist]);
      return newPlaylist.id;
    } catch (error) {
      console.error("Failed to create playlist:", error);
      return null;
    }
  };

  const deletePlaylist = async (playlistId) => {
    if (!authContext.authToken) {
      console.error("Not authenticated");
      return;
    }
    
    try {
      await api.deletePlaylist(playlistId, authContext.authToken);
      setPlaylists((p) => p.filter((pl) => pl.id !== playlistId));
    } catch (error) {
      console.error("Failed to delete playlist:", error);
    }
  };

  const renamePlaylist = async (playlistId, newName) => {
    if (!authContext.authToken) {
      console.error("Not authenticated");
      return;
    }
    
    try {
      const updated = await api.renamePlaylist(playlistId, newName, authContext.authToken);
      setPlaylists((p) => p.map((pl) => (pl.id === playlistId ? updated : pl)));
    } catch (error) {
      console.error("Failed to rename playlist:", error);
    }
  };

  const addMovieToPlaylist = async (playlistId, movie) => {
    if (!authContext.authToken) {
      console.error("Not authenticated");
      return;
    }
    
    const movieId = typeof movie === "object" ? movie.id : movie;
    try {
      const updated = await api.addMovieToPlaylist(playlistId, movieId, authContext.authToken);
      setPlaylists((p) => p.map((pl) => (pl.id === playlistId ? updated : pl)));
    } catch (error) {
      console.error("Failed to add movie to playlist:", error);
    }
  };

  const removeMovieFromPlaylist = async (playlistId, movieId) => {
    if (!authContext.authToken) {
      console.error("Not authenticated");
      return;
    }
    
    try {
      const updated = await api.removeMovieFromPlaylist(playlistId, movieId, authContext.authToken);
      setPlaylists((p) => p.map((pl) => (pl.id === playlistId ? updated : pl)));
    } catch (error) {
      console.error("Failed to remove movie from playlist:", error);
    }
  };

  const clearPlaylist = async (playlistId) => {
    if (!authContext.authToken) {
      console.error("Not authenticated");
      return;
    }
    
    try {
      const updated = await api.clearPlaylist(playlistId, authContext.authToken);
      setPlaylists((p) => p.map((pl) => (pl.id === playlistId ? updated : pl)));
    } catch (error) {
      console.error("Failed to clear playlist:", error);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        myReviews,
        playlists,
        createPlaylist,
        deletePlaylist,
        renamePlaylist,
        addMovieToPlaylist,
        removeMovieFromPlaylist,
        clearPlaylist,
        loading,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;

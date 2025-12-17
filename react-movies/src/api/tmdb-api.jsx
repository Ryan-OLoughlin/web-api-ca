export const getMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/discover`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/${id}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getGenres = () => {
    return fetch(
      `http://localhost:8080/api/movies/genres`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
   });
  };

export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `http://localhost:8080/api/movies/${id}/images`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `http://localhost:8080/api/movies/${id}/reviews`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

export const getTrendingMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/trending`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getTopRatedMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/top_rated`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getUpcomingMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/upcoming`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getCast = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/${id}/credits`
  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getRecommendations = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/${id}/recommendations`
  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getVideos = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/${id}/videos`
  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};


export const getPerson = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/person/${id}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getPersonMovieCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/person/${id}/movie_credits`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getSearchMovies = ({ queryKey }) => {
  const [, params = {}] = queryKey;
  const { query = '', page = 1 } = params;
  return fetch(
    `http://localhost:8080/api/movies/search?query=${encodeURIComponent(query)}&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json().then((data) => data);
  })
  .catch((error) => {
    throw error
 });
};

export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

// --- Favorites API ---
export const getFavorites = async (token) => {
  const response = await fetch('http://localhost:8080/api/favorites', {
    headers: {
      'Authorization': token,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || "Failed to fetch favorites");
  }
  return await response.json();
};

export const addFavorite = async (movieId, token) => {
  const response = await fetch('http://localhost:8080/api/favorites', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({ movieId }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || "Failed to add favorite");
  }
  return await response.json();
};

export const removeFavorite = async (movieId, token) => {
  const response = await fetch(`http://localhost:8080/api/favorites/${movieId}`, {
    method: 'delete',
    headers: {
      'Authorization': token,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || "Failed to remove favorite");
  }
  return await response.json();
};

// --- Playlists API ---
export const getPlaylists = async (token) => {
  const response = await fetch('http://localhost:8080/api/playlists', {
    headers: {
      'Authorization': token,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || "Failed to fetch playlists");
  }
  return await response.json();
};

export const createPlaylist = async (name, token) => {
  const response = await fetch('http://localhost:8080/api/playlists', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || "Failed to create playlist");
  }
  return await response.json();
};

export const deletePlaylist = async (playlistId, token) => {
  const response = await fetch(`http://localhost:8080/api/playlists/${playlistId}`, {
    method: 'delete',
    headers: {
      'Authorization': token,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || "Failed to delete playlist");
  }
  return await response.json();
};

export const renamePlaylist = async (playlistId, newName, token) => {
  const response = await fetch(`http://localhost:8080/api/playlists/${playlistId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({ name: newName }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || "Failed to rename playlist");
  }
  return await response.json();
};

export const addMovieToPlaylist = async (playlistId, movieId, token) => {
  const response = await fetch(`http://localhost:8080/api/playlists/${playlistId}/movies`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({ movieId }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || "Failed to add movie to playlist");
  }
  return await response.json();
};

export const removeMovieFromPlaylist = async (playlistId, movieId, token) => {
  const response = await fetch(`http://localhost:8080/api/playlists/${playlistId}/movies/${movieId}`, {
    method: 'delete',
    headers: {
      'Authorization': token,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || "Failed to remove movie from playlist");
  }
  return await response.json();
};

export const clearPlaylist = async (playlistId, token) => {
  const response = await fetch(`http://localhost:8080/api/playlists/${playlistId}/clear`, {
    method: 'put',
    headers: {
      'Authorization': token,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || "Failed to clear playlist");
  }
  return await response.json();
};

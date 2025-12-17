import express from 'express';
import asyncHandler from 'express-async-handler';
import { 
    getMovies, getMovie, getGenres,
    getMovieImages, getMovieReviews, getTopRatedMovies,
    getUpcomingMovies, getTrendingMovies, getCast,
    getRecommendations, getVideos, getSearchMovies
} from '../tmdb-api'; 

const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/top_rated', asyncHandler(async (req, res) => {
    const topRatedMovies = await getTopRatedMovies();
    res.status(200).json(topRatedMovies);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/trending', asyncHandler(async (req, res) => {
    const trendingMovies = await getTrendingMovies();
    res.status(200).json(trendingMovies);
}));

router.get('/search', asyncHandler(async (req, res) => {
    const { query, page } = req.query;
    const results = await getSearchMovies({ queryKey: [null, { query, page }] });
    res.status(200).json(results);
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const images = await getMovieImages({ queryKey: [null, { id }] });
    res.status(200).json(images);
}));

router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const reviews = await getMovieReviews({ queryKey: [null, { id }] });
    res.status(200).json(reviews);
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const credits = await getCast({ queryKey: [null, { id }] });
    res.status(200).json(credits);
}));

router.get('/:id/recommendations', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const recommendations = await getRecommendations({ queryKey: [null, { id }] });
    res.status(200).json(recommendations);
}));

router.get('/:id/videos', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const videos = await getVideos({ queryKey: [null, { id }] });
    res.status(200).json(videos);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const movie = await getMovie({ queryKey: [null, { id }] });
    res.status(200).json(movie);
}));

export default router;

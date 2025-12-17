import express from 'express';
import asyncHandler from 'express-async-handler';
import { getPerson, getPersonMovieCredits } from '../tmdb-api';

const router = express.Router();

router.get('/:id/movie_credits', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const credits = await getPersonMovieCredits({ queryKey: [null, { id }] });
    res.status(200).json(credits);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const person = await getPerson({ queryKey: [null, { id }] });
    res.status(200).json(person);
}));

export default router;

import express from 'express';
import asyncHandler from 'express-async-handler';
import authenticate from '../../authenticate/index.js';
import Favorite from './favoriteModel.js';

const router = express.Router();

// Get current user's favorites
router.get(
	'/',
	authenticate,
	asyncHandler(async (req, res) => {
		const docs = await Favorite.find({ user: req.user._id }).lean();
		res.status(200).json(docs.map((d) => ({ movieId: d.movieId })));
	})
);

// Add a movie to favorites
router.post(
	'/',
	authenticate,
	asyncHandler(async (req, res) => {
		const { movieId } = req.body || {};
		if (!movieId && movieId !== 0) {
			return res.status(400).json({ success: false, msg: 'movieId is required' });
		}
		try {
			const doc = await Favorite.findOneAndUpdate(
				{ user: req.user._id, movieId },
				{ user: req.user._id, movieId },
				{ upsert: true, new: true, setDefaultsOnInsert: true }
			).lean();
			res.status(201).json({ success: true, movieId: doc.movieId });
		} catch (e) {
			res.status(500).json({ success: false, msg: 'Failed to add favorite' });
		}
	})
);

// Remove a movie from favorites
router.delete(
	'/:movieId',
	authenticate,
	asyncHandler(async (req, res) => {
		const movieId = Number(req.params.movieId);
		await Favorite.deleteOne({ user: req.user._id, movieId });
		res.status(200).json({ success: true });
	})
);

export default router;

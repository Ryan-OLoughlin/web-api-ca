import express from 'express';
import asyncHandler from 'express-async-handler';
import authenticate from '../../authenticate/index.js';
import Playlist from './playlistModel.js';

const router = express.Router();

// List playlists for current user
router.get(
	'/',
	authenticate,
	asyncHandler(async (req, res) => {
		const docs = await Playlist.find({ user: req.user._id }).lean();
		const result = docs.map((d) => ({ id: d._id.toString(), name: d.name, movieIds: d.movieIds || [] }));
		res.status(200).json(result);
	})
);

// Create a new playlist
router.post(
	'/',
	authenticate,
	asyncHandler(async (req, res) => {
		const { name = 'New Playlist' } = req.body || {};
		const doc = await Playlist.create({ user: req.user._id, name, movieIds: [] });
		res.status(201).json({ id: doc._id.toString(), name: doc.name, movieIds: [] });
	})
);

// Rename a playlist
router.put(
	'/:id',
	authenticate,
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const { name } = req.body || {};
		const doc = await Playlist.findOneAndUpdate(
			{ _id: id, user: req.user._id },
			{ name },
			{ new: true }
		).lean();
		if (!doc) return res.status(404).json({ success: false, msg: 'Playlist not found' });
		res.status(200).json({ id: doc._id.toString(), name: doc.name, movieIds: doc.movieIds || [] });
	})
);

// Delete a playlist
router.delete(
	'/:id',
	authenticate,
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		await Playlist.deleteOne({ _id: id, user: req.user._id });
		res.status(200).json({ success: true });
	})
);

// Add movie to playlist
router.post(
	'/:id/movies',
	authenticate,
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const { movieId } = req.body || {};
		if (!movieId && movieId !== 0) return res.status(400).json({ success: false, msg: 'movieId is required' });
		const doc = await Playlist.findOne({ _id: id, user: req.user._id });
		if (!doc) return res.status(404).json({ success: false, msg: 'Playlist not found' });
		if (!doc.movieIds.includes(movieId)) doc.movieIds.push(movieId);
		await doc.save();
		res.status(200).json({ id: doc._id.toString(), name: doc.name, movieIds: doc.movieIds });
	})
);

// Remove movie from playlist
router.delete(
	'/:id/movies/:movieId',
	authenticate,
	asyncHandler(async (req, res) => {
		const { id, movieId } = req.params;
		const mId = Number(movieId);
		const doc = await Playlist.findOne({ _id: id, user: req.user._id });
		if (!doc) return res.status(404).json({ success: false, msg: 'Playlist not found' });
		doc.movieIds = (doc.movieIds || []).filter((x) => x !== mId);
		await doc.save();
		res.status(200).json({ id: doc._id.toString(), name: doc.name, movieIds: doc.movieIds });
	})
);

// Clear playlist
router.put(
	'/:id/clear',
	authenticate,
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const doc = await Playlist.findOne({ _id: id, user: req.user._id });
		if (!doc) return res.status(404).json({ success: false, msg: 'Playlist not found' });
		doc.movieIds = [];
		await doc.save();
		res.status(200).json({ id: doc._id.toString(), name: doc.name, movieIds: doc.movieIds });
	})
);

export default router;


import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  title:  String,
  description:  String ,
  genres: [String],
  total_runtime: Number,
  total_revenue: Number,
  vote_average: Number,
  vote_count: Number,
  creation_date: String,
});

export default mongoose.model('Playlist', PlaylistSchema);
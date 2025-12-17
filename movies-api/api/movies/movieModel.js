import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title:  String,
  overview:  String ,
  genres: [String],
  runtime: Number,
  revenue: Number,
  vote_average: Number,
  vote_count: Number,
  original_language: String,
  budget: Number,
  release_date: Date,
});

export default mongoose.model('Movie', MovieSchema);

import mongoose from 'mongoose';

const { Schema } = mongoose;

const PlaylistSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    movieIds: { type: [Number], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('Playlist', PlaylistSchema);
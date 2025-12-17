import mongoose from 'mongoose';

const { Schema } = mongoose;

const FavoriteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: Number, required: true },
  },
  { timestamps: true }
);

FavoriteSchema.index({ user: 1, movieId: 1 }, { unique: true });

export default mongoose.model('Favorite', FavoriteSchema);

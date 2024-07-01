import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type LikeStore = {
  likes: Record<number, number>;
  isLiked: Record<number, boolean>;
  toggleLike: (post_id: number) => void;
  initializeLikes: (post_id: number, likes: number) => void;
};

type LikePersist = (
  config: StateCreator<LikeStore>,
  options: PersistOptions<LikeStore>
) => StateCreator<LikeStore>;

export const useLikeStore = create<LikeStore>(
  (persist as LikePersist)(
    (set) => ({
      likes: {},
      isLiked: {},
      toggleLike: (post_id: number) =>
        set((state) => ({
          isLiked: {
            ...state.isLiked,
            [post_id]: !state.isLiked[post_id],
          },
          likes: {
            ...state.likes,
            [post_id]: state.isLiked[post_id]
              ? state.likes[post_id] - 1
              : state.likes[post_id] + 1,
          },
        })),
      initializeLikes: (post_id: number, likes: number) =>
        set((state) => ({
          likes: {
            ...state.likes,
            [post_id]: likes,
          },
          isLiked: {
            ...state.isLiked,
            [post_id]: state.isLiked[post_id] || false,
          },
        })),
    }),
    {
      name: "like-storage",
    }
  )
);

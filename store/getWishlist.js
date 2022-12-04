import create from 'zustand';
import { persist } from 'zustand/middleware';
//Zustand Store ✅ 🐻
const usewishList = create(
  persist(
    (set, get) => ({
      totalwishList: 0,
      addwishList: (total) => {
        set(() => ({
          totalwishList: total,
        }));
      },
      updatewishList: () => {
        set((state) => ({
          totalwishList: state.totalwishList + 1,
        }));
      },
      deleteWishList: () => {
        set(() => ({
          totalwishList: 0,
        }));
      },
    }),
    {
      name: 'wishlist',
    },
  ),
);
export default usewishList;

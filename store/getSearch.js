import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
//Zustand Store ✅ 🐻
const useSearch = create(
  persist(
    (set, get) => ({
      searchList: [],
      topSearch: [],
      fatchTopSearch: async () => {
        const res = await axios.get('/api/product/searchlist', {
          headers: {
            token: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        });
        set({ topSearch: res?.data });
      },
      addSearchList: (name) => {
        set((state) => ({
          searchList: state.searchList.find((item) =>
            item.value === name ? true : false
          )
            ? [...state.searchList]
            : [{ value: name }, ...state.searchList],
        }));
      },
    }),
    {
      name: 'search',
    }
  )
);
export default useSearch;

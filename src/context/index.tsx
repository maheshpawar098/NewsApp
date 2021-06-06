import React, {useEffect, useState} from 'react';
import api from 'service';
import localStorage from 'utils/localStore';
import {TopStory} from 'utils/model';

type Props = {
  favorites: TopStory[];
  addToFavorites: (story: TopStory) => void;
  removeFromFavorites: (story: TopStory) => void;
  stories: TopStory[];
  isLoading: boolean;
};

const INITIAL_VALUE: any = null;

const appContext = React.createContext<Props>(INITIAL_VALUE);

const ContextProvider: React.FC<{}> = ({children}) => {
  const [favorites, setFavorites] = useState<TopStory[]>([]);
  const [stories, setStories] = useState<TopStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLocalFavorites();
    getStories();
  }, []);

  const getStories = async () => {
    const {data}: {data: number[]} = await api.getStories();

    const stories = await Promise.all(
      data.slice(0, 20).map(async storyId => {
        const {data} = await api.getStoryById(storyId);
        return data;
      }),
    );

    setStories(stories);
    setIsLoading(false);
  };

  const getLocalFavorites = async () => {
    const favorites =  await localStorage.getItem(localStorage.keys.FAVORITES) || [];
    setFavorites(favorites);
  };

  const addToFavorites = async (story: TopStory) => {
    const newFavorite = [...favorites, story];
    setFavorites(newFavorite);
    await localStorage.setItem(localStorage.keys.FAVORITES, newFavorite);
  };

  const removeFromFavorites = async (story: TopStory) => {
    const index = favorites.findIndex(val => val.id === story.id);
    const newFavorite = favorites.splice(index, 1);
    console.log(newFavorite, index);

    setFavorites([...favorites]);

    localStorage.setItem(localStorage.keys.FAVORITES, [...favorites]);

  };
  console.log(favorites);


  return (
    <appContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        stories,
        isLoading,
      }}>
      {children}
    </appContext.Provider>
  );
};

export {appContext};

export default ContextProvider;

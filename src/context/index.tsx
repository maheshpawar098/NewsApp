import filterData from 'context/helper';
import React, {useEffect, useState} from 'react';
import api from 'service';
import {getHostName} from 'utils';
import localStorage from 'utils/localStore';
import {TopStory} from 'utils/model';

type Props = {
  favorites: TopStory[];
  addToFavorites: (story: TopStory) => void;
  removeFromFavorites: (story: TopStory) => void;
  stories: TopStory[];
  setStories: React.Dispatch<React.SetStateAction<TopStory[]>>
  isLoading: boolean;
  maxScore: number;
  setNewsScore: React.Dispatch<React.SetStateAction<number>>;
  newsScore: number;
  source: Map<string, number>;
  setSelectedSource: React.Dispatch<React.SetStateAction<string>>;
  selectedSource: string;
  newNewsCount: number;
};

const INITIAL_VALUE: any = null;

const appContext = React.createContext<Props>(INITIAL_VALUE);

const ContextProvider: React.FC<{}> = ({children}) => {
  const [favorites, setFavorites] = useState<TopStory[]>([]);
  const [stories, setStories] = useState<TopStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [maxScore, setMaxScore] = useState(0);
  const [newNews, setNewNews] = useState(0);
  const [newsScore, setNewsScore] = useState(-1);
  const [source, setSource] = useState<Map<string, number>>(new Map());
  const [selectedSource, setSelectedSource] = useState('all');

  useEffect(() => {
    getLocalData();
    getStories();
  }, []);

  useEffect(() => {
    let unRead = 0
    stories.forEach(story =>{
      if(!story.read){
        unRead++;
      }
    })
    setNewNews(unRead);
    storeStories()
  }, [stories]);

  
  const storeStories = async () => {
    if(stories.length){
      await localStorage.setItem(localStorage.keys.STORIES, stories)
    }
    
  }

  const timer = () => {

    setTimeout(() => {
      getStories();
    }, 5000);
  };
  

  const getStories = async () => {
    const {data}: {data: number[]} = await api.getStories();

    const stories: TopStory[] = await localStorage.getItem(localStorage.keys.STORIES)|| []
    let maxScore = 0;
    const sources = new Map<string, number>();

    const newStories = await Promise.all(
      data.slice(0, 20).map(async (storyId, index) => {
        try {
          let story = stories.find(story => story.id === storyId);
          if (!story) {
            const {data}: {data: TopStory} = await api.getStoryById(storyId);
            story = {...data, read: false};
          }
          if (story) {
            const source = getHostName(story.url);
            if (sources.has(source)) {
              const count = sources.get(source) || 0;
              sources.set(source, count + 1);
            } else if (source) {
              sources.set(source, 1);
            }
            if (maxScore < story.score) {
              maxScore = story.score;
            }
            return story;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      }),
    );
    const filterStories: any[] = newStories.filter(item => !!item);
    sources.set('all', filterStories.length);

    setMaxScore(maxScore);
    setSource(sources);
    setStories(filterStories);
    setIsLoading(false);
    timer();

  };

  const getLocalData = async () => {
    const favorites =
      (await localStorage.getItem(localStorage.keys.FAVORITES)) || [];
    const score = (await localStorage.getItem(localStorage.keys.SCORE)) || -1;
    const stories: TopStory[] = await localStorage.getItem(localStorage.keys.STORIES) || []
    setStories(stories)
    setNewsScore(score);
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

  return (
    <appContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        stories: filterData(stories, newsScore, selectedSource),
        isLoading,
        maxScore,
        newsScore,
        setNewsScore,
        source,
        selectedSource,
        setSelectedSource,
        setStories,
        newNewsCount: newNews
      }}>
      {children}
    </appContext.Provider>
  );
};

export {appContext};

export default ContextProvider;

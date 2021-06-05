import {Request} from 'utils/model';

const getHackerApi = ({get, post}: Request) => {
  const getStories = () => get({url: `/newstories.json`});

  const getStoryById = (storyId: number) => get({url: `/item/${storyId}.json?print=pretty`});

  return {
    getStories,
    getStoryById,
  };
};

export default getHackerApi;

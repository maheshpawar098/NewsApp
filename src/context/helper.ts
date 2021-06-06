import {getHostName} from 'utils';
import {TopStory} from 'utils/model';

const filterData = (data: TopStory[] = [], score: number, author: string) => {
  if (score === -1 && author === 'all') {
    return data;
  }

  return data.filter(item => {
    try {
      return (
        (score !== -1 && item.score === score) ||
        (author !== 'all' && author === item.by)
      );
    } catch (error) {
      return false;
    }

    return false;
  });
};

export default filterData;

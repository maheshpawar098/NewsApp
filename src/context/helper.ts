import {getHostName} from 'utils';
import {TopStory} from 'utils/model';

const filterData = (data: TopStory[] = [], score: number, source: string) => {
  if (score === -1 && source === 'all') {
    return data;
  }

  return data.filter(item => {
    try {
      return (
        (score !== -1 && item.score === score) ||
        (source !== 'all' && source === getHostName(item.url))
      );
    } catch (error) {
      return false;
    }

    return false;
  });
};

export default filterData;

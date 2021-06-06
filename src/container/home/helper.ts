import { TopStory } from "utils/model";

const filterData = (data: TopStory[] = [], search: string) => {
    if (!search) {
      return data;
    }
  
    return data.filter(item => {
      try {
        if (
          `${item.score}` === search ||
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.by.toLowerCase().includes(search.toLowerCase())
        )
          return true;
      } catch (error) {
        return false;
      }
  
      return false;
    });
  };

  export default filterData
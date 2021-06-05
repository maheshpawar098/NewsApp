import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import api from 'service';
import {Card} from 'components';


type Props = {};

const Home: React.FC<Props> = () => {
  const [stories, setStories] = useState<number[]>([]);

  useEffect(() => {
    getStories();
  }, []);

  const getStories = async () => {
    const {data, status} = await api.getStories();
    setStories(data);
  };

  const renderItem = ({item}: {item: number}) => {
    return <Card storyId={item} />;
  };

  return (
    <>
      <FlatList
        data={stories}
        keyExtractor={item => item + ''}
        renderItem={renderItem}
        initialNumToRender={20}
      />
    </>
  );
};

export default Home;

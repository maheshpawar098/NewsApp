import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StatusBar, View} from 'react-native';
import api from 'service';
import {Card, Header} from 'components';
import colors from 'utils/constant/colors';

type Props = {};

const Home: React.FC<Props> = () => {
  const [stories, setStories] = useState<number[]>([]);

  useEffect(() => {
    getStories();
  }, []);

  const getStories = async () => {
    const {data, status} = await api.getStories();
    setStories(data.slice(0, 20));
  };

  const renderItem = ({item}: {item: number}) => {
    return <Card storyId={item} />;
  };

  return (
    <View style={{backgroundColor: colors.background, paddingBottom: 40}}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <ScrollView>
        <Header />
        <FlatList
          data={stories}
          keyExtractor={item => item + ''}
          renderItem={renderItem}
          initialNumToRender={20}
        />
      </ScrollView>
    </View>
  );
};

export default Home;

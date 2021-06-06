import React, {useCallback, useEffect, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import api from 'service';
import {Card, Header, NewsHeader} from 'components';
import colors from 'utils/constant/colors';
import {TopStory} from 'utils/model';
import NewsLoader from 'components/NewsLoader';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const Home: React.FC<Props> = () => {
  const [stories, setStories] = useState<TopStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');
  const navigation = useNavigation<any>();

  useEffect(() => {
    getStories();
  }, []);

  const getStories = async () => {
    const {data}: {data: number[]} = await api.getStories();
    // const stories: TopStory[] = [];

    // data.slice(0, 20).map(async storyId => {
    //   const {data} = await api.getStoryById(storyId);
    //   return data
    // });

    const stories = await Promise.all(
      data.slice(0, 20).map(async storyId => {
        const {data} = await api.getStoryById(storyId);
        return data;
      }),
    );

    setStories(stories);
    setIsLoading(false);
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {y} = e.nativeEvent.contentOffset;
    setShowTitle(y > 50);
    setShowSearch(y > 115);
  };

  const renderCardItem = useCallback(
    (item: TopStory) => {
      return <Card story={item} key={item.id} />;
    },
    [stories],
  );

  const renderLoaderItem = useCallback((_: any, i: number) => {
    return <NewsLoader key={i} />;
  }, []);
  

  return (
    <View style={{backgroundColor: colors.background, paddingBottom: 60}}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <Header showTitle={showTitle} showSearch={showSearch} />
      <ScrollView onScroll={onScroll}>
        <NewsHeader setSearch={setSearch} search={search} />
        {isLoading ? (
          <>{Array.from(Array(8)).map(renderLoaderItem)}</>
        ) : (
          <>{filterData(stories, search).map(renderCardItem)}</>
        )}
      </ScrollView>
    </View>
  );
};

const filterData = (data: TopStory[], search: string) => {
  if (search === '') {
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

export default Home;

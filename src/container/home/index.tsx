import React, {useCallback, useRef, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
  View,
  FlatList,
  TextInput,
  Keyboard,
} from 'react-native';
import {Card, Empty, Header, HeaderLoader, NewsHeader} from 'components';
import colors from 'utils/constant/colors';
import {TopStory} from 'utils/model';
import NewsLoader from 'components/NewsLoader';
import {RouteProp} from '@react-navigation/native';
import {useStore} from 'hooks';
import filterData from 'container/home/helper';

type RootStackParamList = {
  Home: {isFavorite: boolean};
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  route: HomeScreenRouteProp;
};

const initail: any = null;

const Home: React.FC<Props> = ({route}) => {
  const searchRef = useRef<TextInput>(initail);
  const scrollRef = useRef<ScrollView>(initail);
  const {isFavorite} = route.params;
  const {
    favorites,
    stories: newsStories,
    isLoading,
    setStories,
    newNewsCount,
  } = useStore();
  const [showTitle, setShowTitle] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {y} = e.nativeEvent.contentOffset;
    const isShowTitle = y > 50;
    const isShowSearchIcon = y > 115;

    if (isShowTitle !== showTitle) {
      setShowTitle(isShowTitle);
    }
    if (isShowSearchIcon !== showSearch) {
      setShowSearch(isShowSearchIcon);
    }
  };

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {y} = e.nativeEvent.contentOffset;
    const scrollIndex = Math.round((y - 150) / 100);

    if (!isFavorite && newNewsCount && scrollIndex >= 0) {

      setStories(prev => {
        const newsStories = prev.map((story, index) => {
          if (!story.read && index <= scrollIndex) {
            return {...story, read: true};
          }
          return story;
        });

        return [...newsStories];
      });
    }
  };

  const onSearchIconPress = () => {
    scrollRef.current?.scrollTo({y: 0});
    searchRef.current?.focus();
    console.log(searchRef);
  };

  const renderCardItem = (item: TopStory) => {
    return <Card isFavorite={isFavorite} story={item} key={item.id} />;
  }

  const renderLoaderItem = useCallback((_: any, i: number) => {
    return <NewsLoader key={i} />;
  }, []);

  const headerTitle = isFavorite ? 'Favorites' : 'News';

  const stories = isFavorite
    ? filterData(favorites, search)
    : filterData(newsStories, search);

  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <Header
        title={headerTitle}
        showTitle={showTitle}
        showSearch={showSearch}
        onSearchPress={onSearchIconPress}
      />
      <ScrollView
        ref={scrollRef}
        onMomentumScrollEnd={onScrollEnd}
        onScroll={onScroll}>
        <NewsHeader
          isFavorite={isFavorite}
          title={headerTitle}
          ref={searchRef}
          setSearch={setSearch}
          search={search}
        />
        {isLoading ? (
          <>{Array.from(Array(6)).map(renderLoaderItem)}</>
        ) : (
          <>
            {stories.length === 0 ? (
              <Empty
                message={isFavorite ? 'Add news to favorites' : 'No news found'}
              />
            ) : (
              <>{stories.map(renderCardItem)}</>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

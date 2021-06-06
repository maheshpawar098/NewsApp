import React, {useCallback, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
  View,
  FlatList,
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

const Home: React.FC<Props> = ({route}) => {
  const {isFavorite} = route.params;
  const {favorites, stories: newsStories, isLoading} = useStore();
  const [showTitle, setShowTitle] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');

  const stories = isFavorite ? favorites : newsStories;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {y} = e.nativeEvent.contentOffset;
    setShowTitle(y > 50);
    setShowSearch(y > 115);
  };

  const renderCardItem = useCallback(({item}: {item: TopStory}) => {
    return <Card story={item} key={item.id} />;
  }, []);

  const renderLoaderItem = useCallback((_: any, i: number) => {
    return <NewsLoader key={i} />;
  }, []);

  const headerTitle = isFavorite ? 'Favorites' : 'News';

  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <Header
        title={headerTitle}
        showTitle={showTitle}
        showSearch={showSearch}
      />
      {isLoading ? (
        <>
          <HeaderLoader />
          {Array.from(Array(6)).map(renderLoaderItem)}
        </>
      ) : (
        <>
          <FlatList
            data={filterData(stories, search)}
            onScroll={onScroll}
            refreshing={true}
            onRefresh={() => {}}
            ListHeaderComponent={() => (
              <NewsHeader
                title={headerTitle}
                setSearch={setSearch}
                search={search}
              />
            )}
            renderItem={renderCardItem}
            ListEmptyComponent={
              <Empty
                message={isFavorite ? 'Add news to favorites' : 'No news found'}
              />
            }
            keyExtractor={item => item.id + ''}
          />
        </>
      )}
    </View>
  );
};

export default Home;

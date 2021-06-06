import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Share} from 'react-native';
import {TopStory} from 'utils/model';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'utils/constant/colors';
import fonts from 'utils/constant/fonts';
import {Container, IconTitle} from 'components';
import {getHostName} from 'utils';
import {dateFormat} from 'utils/date';
import {useStore} from 'hooks';

type RootStackParamList = {
  Details: {story: TopStory};
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const Details: React.FC<Props> = ({route}) => {
  const {story} = route.params;
  const {favorites, addToFavorites, removeFromFavorites} = useStore();
  const navigation = useNavigation();
  const [isFavorite, setIsFavisFavorite] = useState(false);

  useEffect(() => {
    const favoriteIndex = favorites.findIndex(val => val.id === story.id);

    setIsFavisFavorite(favoriteIndex !== -1);
  }, []);

  const onUrlPress = () => {
    navigation.navigate('WebView', {story});
  };

  const onFavoritesPress = () => {
    if (isFavorite) {
      removeFromFavorites(story);
    } else {
      addToFavorites(story);
    }
    setIsFavisFavorite(!isFavorite);
  };

  const onShare = async () => {
    try {
      await Share.share({
        message:
          `Welcome to news app, \n\n${story.title}\n\n${story.url}`,
      });
     
    } catch (error) {
    }
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.urlContainer}>
          <TouchableOpacity onPress={onUrlPress}>
            <Text style={styles.url}>{getHostName(story.url)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{story.title}</Text>
        </View>
        <View style={styles.infoContainer}>
          <IconTitle
            textStyle={{
              textTransform: 'capitalize',
              color: colors.primary,
              fontFamily: fonts.medium,
            }}
            style={{
              opacity: 1,
            }}
            name={story.type}
          />
          <IconTitle name={dateFormat(story.time)} />
        </View>
        <View style={styles.infoContainer}>
          <IconTitle
            name={story.score}
            iconSize={24}
            iconColor={colors.red}
            iconName={'thumb-up-outline'}
          />
          <IconTitle
            iconName={'account-outline'}
            iconSize={24}
            name={story.by}
            iconColor={colors.secondary}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 8,
          }}>
          <IconTitle
            iconName={isFavorite ? 'star' : 'star-outline'}
            iconSize={28}
            iconColor={colors.primary}
            onPress={onFavoritesPress}
            name={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          />
          <Ionicons
            style={[styles.icon, {color: colors.text}]}
            name={'share-social-outline'}
            onPress={onShare}
            size={24}
          />
        </View>
        <View style={styles.border} />
        {/* <View>
          <Text style={styles.comments}>Comments</Text>
        </View> */}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleContainer: {
    paddingVertical: 5,
    minHeight: 100,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.medium,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  icon: {
    opacity: 0.6,
    color: colors.primary,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginVertical: 30,
  },
  urlContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  url: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.secondary,
    textDecorationLine: 'underline',
  },
  comments: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.secondary,
  },
});

export default Details;

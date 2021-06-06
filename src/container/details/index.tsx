import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {TopStory} from 'utils/model';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'utils/constant/colors';
import fonts from 'utils/constant/fonts';
import { IconTitle } from 'components';
import { getHostName } from 'utils';
import { dateFormat } from 'utils/date';

type RootStackParamList = {
  Details: {story: TopStory};
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const Details: React.FC<Props> = ({route}) => {
  const {story} = route.params;
  const navigation = useNavigation();
  const onUrlPress = () => {
    navigation.navigate('WebView', {story});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Icon size={28} name="arrow-left" />
      </TouchableOpacity>
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
        <View
          style={{
            flexDirection: 'row',
          }}>
          <IconTitle
            name={story.score}
            iconSize={16}
            iconName={'thumb-up-outline'}
          />
          <IconTitle
            style={{
              paddingHorizontal: 10,
            }}
            iconName={'account-outline'}
            iconSize={18}
            name={story.by}
          />
        </View>

        <IconTitle
          iconName={'share-outline'}
          iconSize={18}
          onPress={onUrlPress}
          name={getHostName(story.url)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    paddingVertical: 15,
    minHeight: 150,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.medium,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 10,
  },
});

export default Details;

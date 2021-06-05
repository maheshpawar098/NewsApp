import {useTheme} from 'hooks';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import api from 'service';
import fonts from 'utils/constant/fonts';
import {dateFormat} from 'utils/date';
import type {TopStory} from 'utils/model';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {getHostName} from 'utils';
import colors from 'utils/constant/colors';

type Props = {
  storyId: number;
};

const Card: React.FC<Props> = ({storyId}) => {
  const {colors} = useTheme();
  const [story, setStory] = useState<TopStory>();
  const navigation = useNavigation();

  useEffect(() => {
    getStoryById();
  }, []);

  const getStoryById = async () => {
    const {data, status} = await api.getStoryById(storyId);

    setStory(data);
  };

  const onDetailsPress = () => {
    navigation.navigate('Details', {storyId});
  };

  if (!story) return null;

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.titleContainer}>

      <TouchableOpacity onPress={onDetailsPress}>
        <Text style={styles.title}>{story.title}</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <IconTitle iconName={'account-box'} iconSize={18} name={story.by} />
        <IconTitle name={dateFormat(story.time)} />
      </View>
      <View style={styles.infoContainer}>
        <IconTitle name={story.score} iconSize={16} iconName={'thumb-up'} />
        <IconTitle name={getHostName(story.url)} />
      </View>
    </View>
  );
};

type IconTitleProps = {
  name: string | number;
  iconName?: string;
  iconSize?: number;
};

const IconTitle: React.FC<IconTitleProps> = ({name, iconName, iconSize}) => {
  return (
    <View style={styles.iconContainer}>
      {iconName && iconSize ? <Icon size={iconSize} style={styles.icon} name={iconName} /> : null}
      <Text numberOfLines={1} style={styles.author}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 18,
  },
  author: {
    fontFamily: fonts.regular,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.6,
    paddingVertical: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 10,
  },
  icon: {
    paddingEnd: 10,
    // backgroundColor: 'red',
    // padding: 0
  },
  titleContainer: {
    minHeight: 50
  }
});

export default Card;

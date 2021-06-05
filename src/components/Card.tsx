import {useTheme} from 'hooks';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import api from 'service';
import fonts from 'utils/constant/fonts';
import { dateFormat } from 'utils/date';
import type {TopStory} from 'utils/model';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

type Props = {
  storyId: number;
};

const Card: React.FC<Props> = ({storyId}) => {
  const {colors} = useTheme();
  const [story, setStory] = useState<TopStory>();
  useEffect(() => {
    getStoryById();
  }, []);

  const getStoryById = async () => {
    const {data, status} = await api.getStoryById(storyId);

    setStory(data);

    console.log(data, status);
  };

  if (!story) return null;

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.author}>by : {story.by}</Text>
      <MaterialCommunityIcons name="account" />
      <Text style={styles.author}>{dateFormat(story.time)}</Text>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingVertical: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 18,
  },
  author: {
    fontFamily: fonts.regular,
    opacity: 0.6,
  },
});

export default Card;

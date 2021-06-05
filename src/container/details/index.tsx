import {ParamListBase, RouteProp, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, { useEffect } from 'react';
import api from 'service';

type RootStackParamList = {
  Details: {storyId: number};
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const Details: React.FC<Props> = ({route}) => {
  const {storyId} = route.params;

  console.log(storyId);

  useEffect(() => {
      getStoryById()
  }, [])

  const getStoryById = async() => {
      const {data} = await api.getStoryById(storyId)

      console.log(data);
      
  }

  return <></>;
};

export default Details;

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from 'utils/constant/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from 'utils/constant/fonts';

type Props = {
    title?: string
};

const Container: React.FC<Props> = ({children, title=""}) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <View style={styles.titleIconContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={navigation.goBack}>
          <Icon size={28} name="arrow-left" />
        </TouchableOpacity>
        <Text numberOfLines={1}  style={styles.title}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  iconContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  titleIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  title: {
      fontFamily: fonts.regular,
      fontSize: 18,
      maxWidth: '80%'
  }
});

export default Container;

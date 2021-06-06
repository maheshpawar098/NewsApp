import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from 'utils/constant/colors';
import fonts from 'utils/constant/fonts';

type Props = {
  message: string;
};

const Empty: React.FC<Props> = ({message}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/noData.png')}
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 250,
    width: 300,
  },
  text: {
    fontFamily: fonts.regular,
    color: colors.text,
    opacity: 0.4,
    fontSize: 18,
  },
});

export default Empty;

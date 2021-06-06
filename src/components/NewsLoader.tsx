import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {StyleSheet, View} from 'react-native';

const NewsLoader: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <ContentLoader
        height={130}
        speed={1}
        backgroundColor={'#999'}
        foregroundColor={'whitesmoke'}
        viewBox="0 0 300 80">
        <Rect x="5" y="0" rx="4" ry="1" width="270" height="8" />
        <Rect x="5" y="15" rx="4" ry="4" width="250" height="8" />
        <Circle x="5" y="60" cx="6" cy="6" r="6" />
        <Circle x="50" y="60" cx="6" cy="6" r="6" />
        <Circle x="200" y="60" cx="6" cy="6" r="6" />
        <Rect x="25" y="62" rx="4" ry="4" width="20" height="8" />
        <Rect x="70" y="62" rx="4" ry="4" width="20" height="8" />
        <Rect x="220" y="62" rx="4" ry="4" width="60" height="8" />
        <Rect x="230" y="40" rx="4" ry="4" width="50" height="8" />
        <Rect x="5" y="40" rx="4" ry="4" width="100" height="8" />
        <Rect x="5" y="90" rx="4" ry="4" width="300" height="1" />
      </ContentLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    paddingVertical: 5,
  },
});

export default NewsLoader;

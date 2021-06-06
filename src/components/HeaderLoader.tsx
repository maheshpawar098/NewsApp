import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {StyleSheet, View} from 'react-native';

const HeaderLoader: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <ContentLoader
        height={130}
        speed={1}
        backgroundColor={'#999'}
        foregroundColor={'whitesmoke'}
        viewBox="0 0 300 80">
        <Rect x="5" y="0" rx="4" ry="1" width="100" height="20" />
        <Rect x="5" y="40" rx="4" ry="4" width="290" height="35" />
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

export default HeaderLoader;

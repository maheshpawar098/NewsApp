import {Container} from 'components';
import ScoreSelector from 'container/filter/ScoreSelector';
import SourceSelector from 'container/filter/SourceSelector';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Filter: React.FC<{}> = () => {
  return (
    <Container title="Filter">
      <View style={styles.container}>
        <ScoreSelector />
        <SourceSelector />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Filter;

import Slider from '@react-native-community/slider';
import {useStore} from 'hooks';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import colors from 'utils/constant/colors';
import fonts from 'utils/constant/fonts';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const ScoreSelector: React.FC<{}> = () => {
  const {maxScore, newsScore, setNewsScore} = useStore();
  const [position, setPosition] = useState(newsScore);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Select news score</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={-1}
        maximumValue={maxScore}
        step={1}
        thumbTintColor={colors.primary}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.secondary}
        onValueChange={setPosition}
        onSlidingComplete={setNewsScore}
        value={position}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.point}>All</Text>
        <Text style={[styles.point, styles.selected]}>
          {position === -1 ? 'All' : position}
        </Text>
        <Text style={styles.point}>{maxScore}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  slider: {
    width: WIDTH - WIDTH / 6,
    height: 40,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 16,
    opacity: 0.6,
  },

  infoContainer: {
    width: WIDTH - WIDTH / 6,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  point: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  selected: {
    color: colors.primary,
  },
  labelContainer: {
    paddingVertical: 10,
  },
});

export default ScoreSelector;

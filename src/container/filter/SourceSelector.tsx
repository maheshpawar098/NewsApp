import {useStore} from 'hooks';
import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import colors from 'utils/constant/colors';
import fonts from 'utils/constant/fonts';

const {width: WIDTH} = Dimensions.get('window');

type Props = {};

const SourceSelector: React.FC<Props> = () => {
  const {source} = useStore();

  const renderItem: ListRenderItem<[string, number]> = ({item}) => {
    return <Chip title={item[0]} count={item[1]} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
      <Text style={styles.label}>Select news source</Text>
      </View>
      <FlatList
        data={Array.from(source)}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item[0]}
      />
    </View>
  );
};

type ChipProps = {
  title: string;
  count: number;
};

const Chip: React.FC<ChipProps> = ({title, count}) => {
  const {selectedSource, setSelectedSource} = useStore();

  const isSelected = title === selectedSource;

  const onPress = () => {
    setSelectedSource(title);
  }

  return (
    <TouchableOpacity
    onPress={onPress}
      style={[
        styles.chipContainer,
        {backgroundColor: isSelected ? colors.blue_chipe : colors.whitesmoke},
      ]}>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[styles.chipTitle, {color: isSelected ? colors.primary : colors.text}]}>{`${count} ${title}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  chipContainer: {
    padding: 10,
    margin: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.whitesmoke,
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    justifyContent: 'flex-start',
  },
  chipTitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    flexGrow: 1,
    opacity: 0.8
  },
  countContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipCount: {
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 16,
    opacity: 0.6,
  },
  labelContainer: {
    paddingVertical: 10
  }
});

export default SourceSelector;

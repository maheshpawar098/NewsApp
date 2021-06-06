import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  Text,
} from 'react-native';
import colors from 'utils/constant/colors';
import fonts from 'utils/constant/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type IconTitleProps = {
  name: string | number;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const IconTitle: React.FC<IconTitleProps> = ({
  name,
  iconName,
  iconSize,
  iconColor = colors.text,
  textStyle,
  style,
  onPress = () => {},
}) => {
  if (name === '') return null;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {iconName && iconSize ? (
        <Icon
          size={iconSize}
          color={iconColor}
          style={styles.icon}
          name={iconName}
        />
      ) : null}
      <Text numberOfLines={1} style={[styles.text, textStyle]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.regular,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.6,
    paddingVertical: 5,
  },

  icon: {
    paddingEnd: 10,
    // backgroundColor: 'red',
    // padding: 0
  },
});


export default IconTitle
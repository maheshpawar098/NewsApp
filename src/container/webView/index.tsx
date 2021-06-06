import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from 'utils/constant/colors';
import fonts from 'utils/constant/fonts';
import {TopStory} from 'utils/model';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WebView as RNWebView} from 'react-native-webview';
import {Container} from 'components';

const {height: HEIGHT} = Dimensions.get('window');

type RootStackParamList = {
  WebView: {story: TopStory};
};

type WebViewScreenRouteProp = RouteProp<RootStackParamList, 'WebView'>;

type Props = {
  route: WebViewScreenRouteProp;
};

const WebView: React.FC<Props> = ({route}) => {
  const {story} = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const endLoading = () => {
    setIsLoading(false);
  };

  return (
    <Container title={story.title}>
      <RNWebView onLoadStart={endLoading} source={{uri: story.url}} />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  titleContainer: {
    paddingVertical: 15,
    minHeight: 150,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.medium,
  },
  loadingContainer: {
    alignSelf: 'center',
    position: 'absolute',
    top: HEIGHT / 2,
  },
});

export default WebView;

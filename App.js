
import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const imageUrl = 'http://jsonplaceholder.typicode.com/photos/';
const imgsPerRow = 3;

class ImageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      height: null,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.getParam('item', {});
    return { title };
  };

  componentDidMount() {
    const { url } = this.props.navigation.getParam('item', {});

    Image.getSize(url, (width, height) => {
      this.setState({ height, isLoading: false });
    });
  }

  render() {
    const { height, isLoading } = this.state;

    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    const { url } = this.props.navigation.getParam('item', {});

    return (
      <ScrollView>
        <Image
          style={{ height, width: '100%' }}
          source={{ uri: url }}
          resizeMode='contain'
        />
      </ScrollView>
    );
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasScrolled: false,
      isLoading: true,
      windowWidth: Dimensions.get('window').width,
    };
  }

  static navigationOptions = {
    title: 'Photobrowser',
  };

  onLayout() {
    this.setState({
      windowWidth: Dimensions.get('window').width,
    });
  }

  componentDidMount() {
    return fetch(imageUrl) // eslint-disable-line
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          imgs: responseJson,
          imgsAmount: 12,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    const imgs = this.state.imgs.slice(0, this.state.imgsAmount);
    const width = this.state.windowWidth / imgsPerRow;

    const { navigate } = this.props.navigation;

    return (
      <View>
        <FlatList
          numColumns={imgsPerRow}
          onLayout={this.onLayout.bind(this)}
          data={imgs}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.2}
          onEndReached={() => this.setState({ imgsAmount: imgs.length + 6 })}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => navigate('Image', { item })}>
              <Image
                style={{ height: 150, width }}
                source={{ uri: item.thumbnailUrl }}
              />
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}

const App = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Image: { screen: ImageScreen },
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(App);

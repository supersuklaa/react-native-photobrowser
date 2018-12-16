import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  Text,
} from 'react-native';

const photosPerRow = 3;
const photosUrl = 'http://jsonplaceholder.typicode.com/photos/';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasScrolled: false,
      error: null,
      isLoading: true,
      windowWidth: Dimensions.get('window').width,
    };
  }

  static navigationOptions = {
    title: 'Photobrowser',
  };

  onLayout() { // re-calculate width if device rotates
    this.setState({
      windowWidth: Dimensions.get('window').width,
    });
  }

  componentDidMount() {
    return fetch(photosUrl)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          photos: responseJson,
          photosAmount: 12,
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false, error });
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

    if (this.state.error) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <Text>
            What a pity, network returned an error:
          </Text>
          <Text style={{ fontWeight: 'bold' }}>
            {this.state.error.message}
          </Text>
        </View>
      );
    }

    if (Object.keys(this.state.photos).length < 1) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <Text>
            What a pity, API returned 0 photos!
          </Text>
        </View>
      );
    }

    const photos = this.state.photos.slice(0, this.state.photosAmount);
    const width = this.state.windowWidth / photosPerRow;

    const { navigate } = this.props.navigation;

    const ImageBlock = ({ item }) => (
      <TouchableHighlight onPress={() => navigate('Details', { item })}>
        <Image
          style={{ height: 150, width }}
          source={{ uri: item.thumbnailUrl }}
        />
      </TouchableHighlight>
    );

    return (
      <FlatList
        numColumns={photosPerRow}
        onLayout={this.onLayout.bind(this)}
        data={photos}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.2}
        onEndReached={() => this.setState({ photosAmount: photos.length + 6 })}
        renderItem={ImageBlock}
      />
    );
  }
}

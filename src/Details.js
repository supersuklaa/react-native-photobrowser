import React from 'react';
import {
  ActivityIndicator,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    const { url } = this.props.navigation.getParam('item');

    this.state = {
      isLoading: true,
      height: null,
      uri: url,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.getParam('item');
    return { title };
  };

  componentDidMount() {
    Image.getSize(this.state.uri, (width, height) => {
      this.setState({ height, isLoading: false });
    });
  }

  render() {
    const { height, isLoading, uri } = this.state;

    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    const { goBack } = this.props.navigation;

    return (
      <ScrollView>
        <TouchableHighlight onPress={() => goBack()}>
          <Image
            style={{ height, width: '100%' }}
            source={{ uri }}
            resizeMode='contain'
          />
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

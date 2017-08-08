import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

class StatusScreen extends Component {
	static navigationOptions = {
		tabBarIcon: ({ tintColor }) => (
	      <Image
	        source={require('./../../assets/icons/status_icon.png')}
	        style={[{width:19,height:25}, {tintColor: tintColor}]}
	      />
	    )
	}

	render() {
		return (
			<View>
			</View>
		);
	}
}

export default StatusScreen;
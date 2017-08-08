import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Background } from './../common';
import DeckContainer from './../components/DeckContainer';
import Timer from './../components/Timer';

class QuizScreen extends Component {
	static navigationOptions = {
		tabBarVisible: false,
		gesturesEnabled: false,
		tabBarIcon: ({ tintColor }) => (
	      <Image
	        source={require('./../../assets/icons/question.png')}
	        style={[{width:24,height:26}, {tintColor: tintColor}]}
	      />
	    )
	}
	
	render() {
		return (
			<View>
				<Background source={require('./../../assets/backgrounds/bg.png')}>
					<DeckContainer/> 
				</Background>				
			</View>
		);
	}
}

export default QuizScreen;
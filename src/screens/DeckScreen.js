import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { resetQuiz, navigate, setDeck } from './../actions';
import { connect } from 'react-redux';
import { Pill, Background } from './../common';

class DeckScreen extends Component {
	static navigationOptions = {
		tabBarIcon: ({ tintColor }) => (
	      <Image
	      	resizeMode="contain"
	        source={require('./../../assets/icons/question.png')}
	        style={[{width:20,height:25}, {tintColor: tintColor}]}
	      />
	    )
	}

	navigate(deck) {
		this.props.navigate('mode');
		this.props.setDeck(deck);
	}

	render() {
		return (
			<ScrollView
				horizontal={true}
				pagingEnabled={true}
				showsHorizontalScrollIndicator={false}
			>
				<Background source={require('./../../assets/backgrounds/1.png')}>
					<View style={styles.backgroundStyle}></View>
					<View style={styles.launcherContainer}>
						<Image style={styles.iconStyle} source={require('./../../assets/icons/standard.png')}/>
						<Text style={styles.textStyle}>STANDARD</Text>
						<Pill onPress={()=>{this.navigate('Standard')}}>START</Pill>
					</View>
				</Background>
				<Background source={require('./../../assets/backgrounds/2.jpg')}>
					<View style={styles.backgroundStyle}></View>
					<View style={styles.launcherContainer}>
						<Image style={styles.iconStyle} source={require('./../../assets/icons/music.png')}/>
						<Text style={styles.textStyle}>MUSIC</Text>
						<Pill onPress={()=>{this.navigate('Music')}}>START</Pill>
					</View>
				</Background>
				<Background source={require('./../../assets/backgrounds/3.jpg')}>
					<View style={styles.backgroundStyle}></View>
					<View style={styles.launcherContainer}>
						<Image style={styles.iconStyle} source={require('./../../assets/icons/anime.png')}/>
						<Text style={styles.textStyle}>CHARACTER</Text>
						<Pill onPress={()=>{this.navigate('Character')}}>START</Pill>
					</View>
				</Background>
			</ScrollView>
		);
	}
}

const styles = {
	backgroundStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		backgroundColor: '#050531',
		opacity: 0.5,
		zIndex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconStyle: {
		height: 150,
		width: 150,
		margin: 5
	},
	textStyle: {
		fontFamily: 'Avenir-Light',
		fontSize: 44,
		color: '#fff',
		textAlign: 'center',
		backgroundColor: 'transparent',
		margin: 5
	},
	launcherContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2,
		position: 'absolute',
		top: 0, left: 0, right: 0, bottom: 0,
	}
}

const mapStateToProps = (state) => {
	return { nav: state.nav };
}

export default connect(mapStateToProps,{navigate,setDeck})(DeckScreen);
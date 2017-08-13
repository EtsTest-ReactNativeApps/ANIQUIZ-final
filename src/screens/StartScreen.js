import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { navigate } from './../actions'
import { Pill } from './../common';

class StartScreen extends Component {

	render() {
		return(
			<Image style={styles.imageStyle} blurRadius={3} source={require('./../../assets/backgrounds/2.jpg')}>
				<View style={styles.backgroundStyle}></View>
				<View style={styles.launcherContainer}>
					<Image style={styles.logoStyle} source={require('./../../assets/icons/logo.png')}/>
					<Text style={styles.textStyle}>ANIQUIZ</Text>
					<Pill onPress={()=>{this.props.downloaded ? this.props.navigate('pack') : this.props.navigate('tutorial') }}>START</Pill>
				</View>
			</Image>
		);
	}
}

const styles = {
	launcherContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2,
		position: 'absolute',
		top: 0, left: 0, right: 0, bottom: 0,
	},
	backgroundStyle: {
		flex: 1,
		opacity: 0.5,
		backgroundColor: '#4B4097',
		zIndex: 1,
	},
	imageStyle: {
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	},
	logoStyle: {
		height: 253,
		width: 250,
		backgroundColor: 'transparent',
		opacity:1
	},
	textStyle: {
		color: '#FFFFFF',
		fontFamily: 'Avenir-Medium',
		fontSize: 44,
		textAlign: 'center',
		backgroundColor: 'transparent',
		margin: 7
	}
}

const mapStateToProps = ({main}) => {
	return { downloaded: main.downloaded }
};

export default connect(mapStateToProps,{ navigate })(StartScreen);
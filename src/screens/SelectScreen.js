import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { navigate, back, setMode, resetQuiz } from './../actions';
import { Skewed } from './../common';

class SelectScreen extends Component {
	static navigationOptions = {
		tabBarVisible: false,
	}

	navigate(mode) {
		this.props.navigate('quiz');
		this.props.resetQuiz();
		this.props.setMode(mode);
	}

	render() {
		const {
			sectionStyle,
			centerStyle,
			imageStyle,
			textStyle,
			xStlye,
			closeStyle,
			fixStyle,
			titleStyle
		} = styles;

		return (
			<View style={fixStyle}>
				<Skewed width={Dimensions.get('window').width+40} height={Dimensions.get('window').height*0.30}><Text style={titleStyle}>{this.props.deck}</Text></Skewed>
				<View style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height*0.70}}>
					<View style={[sectionStyle,centerStyle]}>
						<TouchableOpacity style={centerStyle} onPress={()=>{this.navigate('Time')}}>
							<Image style={imageStyle} source={require('./../../assets/icons/time.png')}/>
							<Text style={textStyle} >Time</Text>
						</TouchableOpacity>
					</View>
					<View style={[sectionStyle,centerStyle]}>
						<TouchableOpacity style={centerStyle} onPress={()=>{this.navigate('Normal')}}>
							<Image style={imageStyle} source={require('./../../assets/icons/normal.png')}/>
							<Text style={textStyle} >Normal</Text>
						</TouchableOpacity>
					</View>
					<View style={[sectionStyle,centerStyle]}>
						<TouchableOpacity style={centerStyle} onPress={()=>{this.navigate('Challenge')}}>
							<Image style={imageStyle} source={require('./../../assets/icons/challenge.png')}/>
							<Text style={textStyle} >Challenge</Text>
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity style={closeStyle} onPress={()=>{this.props.back()}}>
					<Image style={xStlye} source={require('./../../assets/icons/close.png')}/>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = {
	textStyle: {
		fontFamily: 'Avenir-Light',
		fontSize: 24,
		color: '#333',
		textAlign: 'center'
	},
	titleStyle: {
		fontFamily: 'Avenir-Light',
		fontSize: 24,
		color: '#fff',
		textAlign: 'center',
		backgroundColor: 'transparent'
	},
	imageStyle: {
		height: 95,
		width: 95,
	},
	xStlye: {
		height: 20,
		width: 20,
	},
	closeStyle: {
		position: 'absolute',
		top: 30,
		left: 20,
		zIndex: 5
	},
	sectionStyle: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 5
	},
	centerStyle: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	fixStyle: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	}
}

const mapStateToProps = (state) => {
	const {
		deck
	} = state.quiz;

	return { deck }
}

export default connect(mapStateToProps,{navigate,back,setMode,resetQuiz})(SelectScreen);
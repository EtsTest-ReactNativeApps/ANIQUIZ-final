import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { back } from './../actions';
import { Background } from './../common';
import ResponsiveImage from './../common/ResponsiveImage';

class LightBoxScreen extends Component {
	static navigationOptions = {
		tabBarVisible: false,
	}

	render() {
		const {
			xStlye,
			closeStyle,
			imageStyle,
			contentContainerStyle,
			questionStyle,
			titleStyle
		} = styles;

		const width = Dimensions.get('window').width;

		return (
			<View style={{flex: 1}}>
				<Background source={require('./../../assets/backgrounds/bg.png')}>
					<View style={contentContainerStyle}>
						<ResponsiveImage width={width} height={0} source={this.props.selectedImage} />
						<Text style={titleStyle}>{this.props.title}</Text>
						<Text style={questionStyle}>{this.props.question}</Text>
					</View>
					<TouchableOpacity style={closeStyle} onPress={()=>{this.props.back()}}>
						<Image style={xStlye} source={require('./../../assets/icons/close.png')}/>
					</TouchableOpacity>
				</Background>
			</View>
		);
	}
}

const styles = {
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
	contentContainerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleStyle: {
		fontFamily: 'Avenir-Medium',
		fontSize: 26,
		backgroundColor: 'transparent',
		margin: 8,
		color: '#fff',
		textAlign: 'center'
	},
	questionStyle: {
		fontFamily: 'Avenir-Light',
		fontSize: 18,
		backgroundColor: 'transparent',
		color: '#fff',
		textAlign: 'center'
	}
}


const mapStateToProps = (state) => {
	const { title, question, selectedImage } = state.quiz;
	return { title, question, selectedImage };
}

export default connect(mapStateToProps,{ back })(LightBoxScreen);
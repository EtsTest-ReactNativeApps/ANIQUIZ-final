import React from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import ResponsiveImage from './ResponsiveImage';

const Skewed = (props) => {
	const SCREEN_WIDTH = Dimensions.get('window').width + 20;
	const SCREEN_HEIGHT = Dimensions.get('window').height;
	const TEXT_CENTER = (props.height*0.22-50)/2;

	const styles = {
		containerStyle: {
			backgroundColor: '#fff'
		},
		textStyle: {
			color: '#fff',
			fontSize: 25,
			fontFamily: 'Avenir-Medium',
			textAlign: 'center',
		},
		backgroundStyle: {
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height*0.25,
			backgroundColor: '#050531',
			opacity: 0.5,
			zIndex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		},
		imageStyle: {
			width: undefined,
			height: undefined,
			flex: 1
		},
	}

	const {
		containerStyle,
		textStyle,
		backgroundStyle,
		imageStyle
	} = styles;

	return (
		<View style={containerStyle}>
			<View
				width={props.width}
				height={props.height*0.25}
			>
				<Image style={imageStyle} source={require('./../../assets/backgrounds/6.jpg')} resizeMode="cover">
					<View style={backgroundStyle}>
						<Text style={textStyle}>
							{props.children}
						</Text>
					</View>
				</Image>
			</View>
		</View>
	);
}

export { Skewed };
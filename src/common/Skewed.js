import React from 'react';
import { View, Text, Dimensions, ImageBackground } from 'react-native';
import ResponsiveImage from './ResponsiveImage';

const Skewed = (props) => {
	const SCREEN_WIDTH = Dimensions.get('window').width + 20;
	const SCREEN_HEIGHT = Dimensions.get('window').height;


	const styles = {
		containerStyle: {
			backgroundColor: '#fff',
		},
		viewStyle: {
			position: 'absolute',
			zIndex: 3,
			elevation: 3,
			alignItems: 'center',
			justifyContent: 'center',
		},
		backgroundStyle: {
			width: Dimensions.get('window').width,
			height: props.height,
			alignItems: 'center',
			justifyContent: 'center',
			zIndex: 1,
			elevation: 1
		},
		imageStyle: {
			width: undefined,
			height: undefined,
			flex: 1
		},
		 triangleCorner: {
		    width: 0,
		    height: 0,
		    backgroundColor: 'transparent',
		    borderStyle: 'solid',
		    borderLeftWidth: Dimensions.get('window').width,
		    borderBottomWidth: 45,
		    borderLeftColor: 'transparent',
		    borderBottomColor: '#fff',
		    position: 'absolute',
		    bottom:0,
		    zIndex: 3
		},
		flipedTriangle: {
			borderBottomWidth: undefined,
			borderBottomColor: undefined,
			bottom: undefined,
			borderTopWidth: 45,
			borderTopColor: '#fff',
			top: 0
		}
	}

	const {
		containerStyle,
		viewStyle,
		backgroundStyle,
		imageStyle,
		triangleCorner,
		flipedTriangle
	} = styles;

	return (
		<View style={containerStyle}>
			<View
				width={props.width}
				height={props.height}
			>
				<ImageBackground style={imageStyle} source={require('./../../assets/backgrounds/6.jpg')} resizeMode="cover">
					<View style={backgroundStyle}>
						<View style={viewStyle}>
							{props.children}
						</View>
					</View>
				</ImageBackground>
				<View style={[triangleCorner,(props.flip ? flipedTriangle : {})]}/>
			</View>
		</View>
	);
}

export { Skewed };
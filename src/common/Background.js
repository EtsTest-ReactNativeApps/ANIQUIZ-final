import React from 'react';
import { Dimensions, ImageBackground, View } from 'react-native';

const Background = (props) => {
	return (
		<ImageBackground style={styles.imageStyle} resizeMode="cover" source={props.source}>
			{props.children}
		</ImageBackground>
	);
}

const styles = {
	imageStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		alignItems: 'center'
	}
}

export { Background };
import React from 'react';
import { Dimensions, Image, View } from 'react-native';

const Background = (props) => {
	return (
		<Image style={styles.imageStyle} resizeMode="cover" source={props.source}>
			{props.children}
		</Image>
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
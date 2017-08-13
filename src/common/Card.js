import React from 'react';
import { View, Text } from 'react-native';

export const Card = (props)=> {
	return(
		<View style={[styles.cardStyle,props.style]}>
			{props.children}
		</View>
	);
}

const styles = {
	cardStyle: {
		backgroundColor: '#fff',
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 0.5
	}
}
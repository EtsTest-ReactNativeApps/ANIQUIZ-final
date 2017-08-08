import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Pill = (props) => {

	return (
		<TouchableOpacity onPress={()=>{props.onPress()}} style={styles.pillViewStyle}>
			<Text style={styles.pillTextStyle}>{props.children}</Text>
		</TouchableOpacity>
	);
}

const styles = {
	pillTextStyle: {
		textAlign: 'center',
		fontFamily: 'Avenir-Medium',
		fontSize: 18,
		color: '#FFFFFF'
	},
	pillViewStyle: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		width: 150,
		borderRadius: 100,
		backgroundColor: '#8C88FF',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 0.5,
		elevation: 3,
		zIndex:4
	}
}

export { Pill };
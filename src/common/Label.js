import React from 'react';
import { View, Text } from 'react-native';

const Label = (props) => {
	return (
		<View style={[styles.labelStyle,{backgroundColor:props.color}]}>
			<Text style={styles.labelTextStyle}>
				{props.children}
			</Text>
		</View>
	);
};

const styles = {
	labelStyle: {
		height: 30,
		width: 30,
		backgroundColor: '#8C88FF',
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 0.2,
		borderRadius: 15,
		elevation: 4,
		alignItems: 'center',
		justifyContent: 'center',
	},
	labelTextStyle: {
		height: 20,
		width: 10,
		fontFamily: 'Avenir-Heavy',
		fontSize: 20,
		lineHeight: 20,
		marginTop: 3,
		paddingTop: 2,
		marginRight: -1,
		textAlign: 'center',
		color: '#333333',
	}
};

export { Label };
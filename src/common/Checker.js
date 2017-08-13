import React from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Label } from './Label';

export const Checker = (props) => {
	const {
		labelTextStyle,
		labelStyle
	} = styles;

	if (props.know) {
		return(
			<TouchableOpacity onPress={()=>{props.onPress()}} style={labelStyle}>
				<Label color="#00ae50">
					<Text style={labelTextStyle}>!</Text>
				</Label>
			</TouchableOpacity>
		);
	} else {
		return(
			<TouchableOpacity onPress={()=>{props.onPress()}} style={labelStyle}>
				<Label color="#FE2B53">
					<Text style={labelTextStyle}>?</Text>
				</Label>
			</TouchableOpacity>
		);
	}
}

const styles = {
	labelStyle: {
		position: 'absolute',
		margin: 2,
		zIndex: 2,
		justifyContent: 'flex-end'
	},
	labelTextStyle: {
		color:'#fff'
	}
}
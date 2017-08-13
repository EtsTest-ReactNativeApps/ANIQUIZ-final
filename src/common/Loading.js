import React from 'react';
import { View, Image, Text } from 'react-native';

export const Loading = (props)=> {
	return(
		<View style={{alignItems:'center'}}>
			<Image style={[styles.loaderStyle,props.style]} source={require('./../../assets/loading.gif')}/>
			<Image style={{height:15,width:125,margin:5}}source={require('./../../assets/fonts/DOWNLOADING.png')}/>
		</View>
	);
}

const styles = {
	loaderStyle: {
		height:170,
		width:225
	}
}
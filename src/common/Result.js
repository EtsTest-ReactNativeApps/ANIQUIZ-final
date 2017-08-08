import React from 'react';
import { View, Text, Image } from 'react-native';

const Result = (props) => {
	const styles = {
		resultStyle:{
			flex:1,
			justifyContent:'center',
			alignItems:'center', 
			backgroundColor: ( props.correct ? '#45B39C' : '#D75A4A' )
		},
		iconStyle: {
			height: 70,
			width: 70
		},
		textStyle: {
			fontFamily: 'Avenir-Heavy',
			color: '#fff',
			fontSize: 30,
			textAlign: 'center',
			margin: 15
		}
	};

	return (
		<View style={styles.resultStyle}>
			<Image style={styles.iconStyle} source={props.correct ? require('./../../assets/icons/correct.png') : require('./../../assets/icons/wrong.png')} />
			<Text style={styles.textStyle}>{props.correct ? 'CORRECT':'WRONG'}</Text>
		</View>
	);
}

export { Result };
import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { setHint, setHintNum } from './../actions';

const Hint = (props) => {
	return (
		<View style={styles.scoreContainer}>
			<TouchableOpacity onPress={()=>{
				if (props.hintNum > 0 ) {
					props.setHint(true);
					props.setHintNum(props.hintNum - 1);
				}
			}}>
				<Image style={styles.iconStyle} source={require('./../../assets/icons/hint.png')}/>
			</TouchableOpacity>
			<View style={styles.hintStyle}>
				<Text style={styles.textStyle}>{String(props.hintNum)}</Text>
			</View>
		</View>
	);
}

const styles = {
	iconStyle: {
		height: 35,
		width: 35
	},
	scoreContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	hintStyle: {
		width: 25,
		height: 25,
		borderRadius: 12,
		backgroundColor: '#fff',		
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: -12,
		marginTop: Platform.OS === 'android' ? 3 : -17,
	},
	textStyle: {
		fontSize: 18,
		fontFamily: 'Avenir-Heavy',
		color: '#333',
		backgroundColor: 'transparent'
	}
};

const mapStateToProps = (state) => {
	const {
		hintNum
	} = state.quiz;

	return { hintNum };
}

export default connect(mapStateToProps,{setHint,setHintNum})(Hint);
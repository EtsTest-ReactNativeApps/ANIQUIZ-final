import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Timer from './../components/Timer';

const Scores = (props) => {
	const {
		textStyle,
		scoreContainer,
		scoresContainer,
		iconStyle,
		containterStyle,
		toastStyle
	} = styles;

	return (
		<View style={containterStyle}>
			{(props.chain >= 0) ? 
				<View style={scoresContainer}>
					<View style={scoreContainer}>
						<Image style={iconStyle} source={require('./../../assets/icons/chain.png')}/>
						<View style={toastStyle}>
							<Text style={textStyle}>{props.chain}</Text>
						</View>
					</View> 
				</View>	:
				<View style={scoresContainer}>
					<View style={scoreContainer}>
						<Image style={iconStyle} source={require('./../../assets/icons/correct.png')}/>
						<View style={toastStyle}>
							<Text style={textStyle}>{props.correct}</Text>
						</View>
					</View>
					{props.time ? <Timer/> : null}
					<View style={scoreContainer}>
						<Image style={iconStyle} source={require('./../../assets/icons/wrong.png')}/>
						<View style={toastStyle}>
							<Text style={textStyle}>{props.wrong}</Text>
						</View>
					</View>
				</View>
			}
		</View>
	);

}

const styles = {
	textStyle: {
		fontSize: 18,
		fontFamily: 'Avenir-Light',
		color: '#333',
		backgroundColor: 'transparent'
	},
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
	scoresContainer: {
		flexDirection: 'row',
	},
	containterStyle: {
		height: 61,
		justifyContent: 'center',
		alignItems: 'center'
	},
	toastStyle: {
		width: 25,
		height: 25,
		borderRadius: 12,
		backgroundColor: '#fff',		
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: -12,
		marginTop: -17
	}
};

export { Scores };
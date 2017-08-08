import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { startTimer, stopTimer } from './../actions';
import { connect } from 'react-redux';

class Timer extends Component {

	componentDidMount() {
		this.props.startTimer();
	}

	componentWillUpdate() {
		if (this.props.time === 0) {
			this.props.stopTimer();
		}
	}

	render() {
		return (
			<View style={styles.scoreContainer}>
				<Image style={styles.iconStyle} source={require('./../../assets/icons/timer.png')}/>
				<View style={styles.toastStyle}>
					<Text style={styles.textStyle}>{this.props.time}</Text>
				</View>
			</View> 
		);
	}
}

const styles = {
	textStyle: {
		fontFamily: 'Avenir-Light',
		fontSize:18,
		fontWeight: '300',
		textAlign: 'center',
		color: '#333',
		padding: 2,
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
	toastStyle: {
		flex: 1,
		borderRadius: 15,
		backgroundColor: '#fff',		
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: -12,
		marginTop: -17
	}
}

const mapStateToProps = (state) => {
	return { time: state.quiz.time }
}

export default connect(mapStateToProps,{startTimer,stopTimer})(Timer);
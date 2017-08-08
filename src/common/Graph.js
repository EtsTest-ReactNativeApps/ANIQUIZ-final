import React from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { Svg } from 'expo';
const { Circle, Text } = Svg;

const Graph = (props) => {
	const bothZero = (props.correct === 0) && (props.wrong === 0);
	const correct = bothZero ? 0 : props.correct;
	const wrong = bothZero ? 1 : props.wrong;

	const rad = 90;
	const circum = Math.PI * 2 * rad;
	const fill = (correct / (correct+wrong)) * circum;
	const grey = (wrong / (correct+wrong)) * circum;

	return (
		<View style={{paddingBottom:5}}>
			<Svg
				width="200"
				height="200"
			>
				<Circle cx="100" cy="100" r="90" fill="transparent"/>
			    <Circle cx="100" cy="100" r="90" fill="transparent" strokeWidth="5" stroke="rgba(0,0,0,0.05)"/>
			    <Circle cx="100" cy="100" r="90" fill="transparent" strokeWidth="5" stroke="#50D2C2" strokeDasharray={String(fill)+', '+String(grey)} />
			    <Text x="95" y="45" fontSize="50" fontFamily="Avenir-Heavy" textAnchor="middle">{props.correct}</Text>
			    <Text x="100" y="110" fontSize="22" fontFamily="Avenir-Light" textAnchor="middle">CORRECT</Text>
			    <Text x="100" y="140" fontSize="15" fontFamily="Avenir-Light" textAnchor="middle" fill="rgba(0,0,0,0.3)" stroke="rgba(0,0,0,0.3)">{Math.round((fill/circum)*100)+'%'}</Text>
			</Svg>
		</View>
	);
}

const mapStateToProps = (state) => {
	const { correct, wrong } = state.quiz;

	return { correct, wrong };
}

export default connect(mapStateToProps)(Graph);
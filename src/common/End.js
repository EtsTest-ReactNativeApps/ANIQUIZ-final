import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Skewed } from './Skewed';
import { connect } from 'react-redux';
import { back, updateTotal } from './../actions';
import { Pill } from './Pill';
import Download from './../components/Download';
import AnimeChecker from './../components/AnimeChecker';
import Graph from './Graph';

const End = (props) => {
	const WIDTH = Dimensions.get('window').width;
	const HEIGHT = Dimensions.get('window').height;
	const styles = {
		endContainerStyle: {
			width: WIDTH,
			height: HEIGHT,
			backgroundColor: '#fff',
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowRadius: 8,
			shadowOpacity: 0.5,
			elevation: 3,
			alignItems: 'center',
			marginLeft: -5,
			marginTop:-25
		},
		quoteContainerStyle: {
			paddingTop:5,
			borderTopWidth:2,
			borderTopColor:'rgba(0,0,0,0.2)',
			margin: 10
		},
		quoteStyle: {
			padding: ( WIDTH > 700 ? 25 : 5),
			textAlign: 'center',
			fontFamily: 'Avenir-Light',
			lineHeight: (WIDTH > 700 ? 30 : 22),
			fontSize: (WIDTH > 700 ? 30 : 15),
			color: '#333'
		},
		quoterStyle: {
			color: '#111',
			opacity: 0.8,
			fontSize: (WIDTH > 700 ? 32 : 17),
			textAlign: 'center',
			fontFamily: 'Avenir-Medium'
		},
		textStyle: {
			fontFamily: 'Avenir-Light',
			fontSize: 24,
			color: '#fff',
			textAlign: 'center',
			backgroundColor: 'transparent'
		}
	};

	const {
		endContainerStyle,
		quoteStyle,
		quoteContainerStyle,
		quoterStyle,
		textStyle
	} = styles;

	//Add Download Section
	
	//not using !props.downloaded since it should also work when props.downloaded is null

	if (props.downloaded !== 'complete' && props.downloaded !== 'reconfigure') {
		return (
			<View style={[endContainerStyle,{marginLeft:0,marginTop:-35,backgroundColor:'transparent'}]}>
				<AnimeChecker/>
			</View>
		);
	} else {
		return (
			<View style={endContainerStyle}>
				<View>
					<Skewed width={WIDTH} height={HEIGHT*0.25}>
						<Text style={textStyle}>RESULT</Text>
					</Skewed>
					<View style={{alignItems:'center'}}>
						<Graph end text="CORRECT"/>
					</View>
					<View style={quoteContainerStyle}>
						<Text style={quoteStyle}>I'm Haruhi Suzumiya, from East Junior High. First off, I'm not interested in ordinary people. But, if any of you are aliens, time-travelers, or espers, please come see me. That is all!</Text>
						<Text style={quoterStyle}>-Haruhi Suzumiya</Text>
					</View>
				</View>
				<Pill onPress={()=>{
					props.back();
					props.updateTotal(props.correct,props.wrong);
				}}>FINISHED</Pill>
			</View>
		);
	}	
}

const mapStateToProps = (state) => {
	const { correct, wrong } = state.quiz;
	return { downloaded: state.main.downloaded, correct, wrong }
};

export default connect(mapStateToProps,{back,updateTotal})(End);
import React, { Component } from 'react';
import { View, Text, Image, Dimensions,ScrollView } from 'react-native';
import { Skewed, Pill } from './../common';
import ResponsiveImage from './../common/ResponsiveImage';
import Graph from './../common/Graph';
import { ANIMES } from './../../assets/animes/animes';
import { connect } from 'react-redux';
import { navigate, download } from './../actions';

class StatusScreen extends Component {
	static navigationOptions = {
		tabBarIcon: ({ tintColor }) => (
	      <Image
	        source={require('./../../assets/icons/status_icon.png')}
	        style={[{width:19,height:25}, {tintColor: tintColor}]}
	      />
	    )
	}

	render() {
		const  {
			containerStyle,flex,
			scoreStyle,
			scoreTextStyle,
			scoreSubtextStyle,
			labelStyle,
			dividerStyle,
			triangleStyle,
			imageStyle,
			titleStyle, percentContainerStyle,
			subTitleStyle, shadowStyle, percentStyle
		} = styles;

		let score = (this.props.totalCorrect/this.props.totalQuiz)*this.props.totalCorrect*10;
		if (isNaN(score)) {score = 0};

		let rank;

		if (score < 800) {
			rank = {name:'beginner',img:require('./../../assets/icons/beginner.png'),left:(800-score),moto:'Starting anime from Zero'};
		} else if (800 <= score && score < 1600) {
			rank = {name:'citizen',img:require('./../../assets/icons/citizen.png'),left:(1600-score),moto:'Welcome to Anime Art Online(AAO)'};
		} else if (1600 <= score && score < 4000) {
			rank = {name:'lord',img:require('./../../assets/icons/lord.png'),left:(4000-score),moto:'Animebreak Company'}
		} else {
			rank = {name:'master',img:require('./../../assets/icons/master.png'),left:0,moto:'No Anime No Life'}
		}

		/*const { animeResult } = this.props;

		const animeResultArr = Object.keys(this.props.animeResult);

		let max = animeResultArr[0];

		for (var i=1; i<animeResultArr.length; i++) {
			const {correct,wrong}  = animeResult[animeResultArr[i]];
			const currentPercent = (correct)/(correct+wrong);
			const maxPercent = (animeResult[max].correct)/(animeResult[max].correct+animeResult[max].wrong);
			if (currentPercent > maxPercent || isNaN(maxPercent)) {
				max = animeResultArr[i];
			}
		}*/

		//const maxAcc = animeResult[max].correct/(animeResult[max].correct+animeResult[max].wrong)*100;

		return (
			<ScrollView style={{flex:1}}>
				<View style={containerStyle}>
					<Skewed width ={Dimensions.get('window').width} height={Dimensions.get('window').height*0.6}>
						<Image style={imageStyle} source={rank.img}/>
						<Text style={titleStyle}>{rank.name.toUpperCase()}</Text>
						<Text style={subTitleStyle}>{rank.moto}</Text>
					</Skewed> 
					<View style={containerStyle}>
						<Graph status text="POINTS"/>
						<Text style={[scoreSubtextStyle,{color:'#333',opacity:1,marginBottom:20}]}>
							{Math.round(rank.left) + ' POINTS left until next LEVEL'}
						</Text>
					</View>
					<View style={dividerStyle}/>
					<View style={scoreStyle}>
						<View style={containerStyle}>
							<Text style={scoreTextStyle}>{this.props.totalCorrect}</Text>
							<Text style={scoreSubtextStyle}>CORRECT</Text>
							<View style={[labelStyle,{backgroundColor:'#50D2C2'}]}/>
						</View>
						<View style={containerStyle}>
							<Text style={scoreTextStyle}>{this.props.totalQuiz}</Text>
							<Text style={scoreSubtextStyle}>SOLVED</Text>
							<View style={[labelStyle,{backgroundColor:'#F8E81C'}]}/>
						</View>
						<View style={containerStyle}>
							<Text style={scoreTextStyle}>{this.props.totalWrong}</Text>
							<Text style={scoreSubtextStyle}>WRONG</Text>
							<View style={[labelStyle,{backgroundColor:'#D0011B'}]}/>
						</View>
					</View>
					
				</View>
			</ScrollView>
		);
	}
}

/*
<Skewed width={Dimensions.get('window').width} height={Dimensions.get('window').height*0.7} flip={true}>
						<View style={[shadowStyle,{marginBottom:5,marginTop:10}]}>
							<ResponsiveImage width={Dimensions.get('window').width*0.45} height={0} source={ANIMES[max]}/>
						</View>
						<View style={[dividerStyle,{width:Dimensions.get('window').width*0.6}]}/>
						<Text style={[titleStyle,{fontSize:20}]}>{max.toUpperCase()+' EXPERT'}</Text>
						<View style={percentContainerStyle}>
							<View style={flex}>
								<Text style={[percentStyle,{color:'#8C88FF'}]}>
									{isNaN(maxAcc) ? 100+'%' : Math.round(maxAcc)+'%'}
								</Text>
								<Text style={subTitleStyle}>Accuracy</Text>
							</View>
							<View style={flex}>
								<Text style={[percentStyle,{color:'#45B39C'}]}>{animeResult[max].correct===undefined ? 0+'Q' : animeResult[max].correct+'Q'}</Text>
								<Text style={subTitleStyle}>Solved</Text>
							</View>
						</View>
					</Skewed>*/
const styles = {
	containerStyle: {
		flex: 1,
		backgroundColor:'#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	scoreTextStyle: {
		textAlign: 'center',
		fontSize: 36,
		color: '#333',
	},
	scoreSubtextStyle: {
		fontSize: 18,
		color: '#333',
		opacity: 0.5
	},
	scoreStyle: {
		width: Dimensions.get('window').width,
		height: 130,
		flexDirection: 'row',
		marginBottom:30
	},
	labelStyle: {
		width: 50,
		height: 4,
		marginTop: 7
	},
	imageStyle: {
		height:100,
		width: 100,
	},
	dividerStyle: {
		height: 2,
		width: Dimensions.get('window').width -30,
		elevation: 3,
		shadowColor: '#000',
   		shadowOffset: {
   			width: 0,
   			height: 0
   		},
   		shadowRadius: 4,
   		shadowOpacity: 0.5
	},
	titleStyle: {
		fontFamily: 'Avenir-Medium',
		fontSize: 24,
		color: '#fff',
		textAlign: 'center',
		backgroundColor: 'transparent'
	},
	subTitleStyle: {
		fontFamily: 'Avenir-Light',
		fontSize: 18,
		color: '#fff',
		textAlign: 'center',
		backgroundColor: 'transparent'
	},
	shadowStyle: {
		elevation: 3,
		shadowColor: '#000',
   		shadowOffset: {
   			width: 0,
   			height: 0
   		},
   		shadowRadius: 4,
   		shadowOpacity: 0.5
	},
	percentStyle: {
		fontFamily: 'Avenir-Heavy',
		fontSize: 26,
		color: '#FFF',
		opacity: 0.8,
		textAlign: 'center',
		backgroundColor: 'transparent',
	},
	percentContainerStyle: {
		flexDirection: 'row',
		flex:1
	},
	flex: {
		flex:1
	}
}

const mapStateToProps = (state) => {
	const { totalQuiz, totalCorrect, totalWrong, animeResult,downloaded } = state.main;

	return { totalQuiz, totalCorrect, totalWrong, animeResult,downloaded };
}

export default connect(mapStateToProps,{navigate,download})(StatusScreen);
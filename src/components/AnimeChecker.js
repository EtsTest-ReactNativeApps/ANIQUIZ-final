import React, { Component } from 'react';
import { View, Text, Image, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Label, Checker, Pill } from './../common';
import ResponsiveImage from './../common/ResponsiveImage';
import { connect } from 'react-redux';
import { animeList } from './../reducers/AnimeList';
import { ANIMES } from './../../assets/animes/animes';
import { setKnowAnime, navigate, download, back } from './../actions';

class AnimeChecker extends Component {

	//onPress handler, sets value of anime to opposite when pressed
	onPress(anime) {
		this.props.setKnowAnime(anime,!this.props.animes[anime]);
	}

	//change all of the value of anime to parameter 'value'
	checkAll(value) {
		for(var anime in animeList) {
			this.props.setKnowAnime(anime,value);
		}
	}

	//render method for one anime
	renderAnime(anime) {
		//styles
		const {
			textStyle,
			cardStyle,
			subTitleStyle,
		} = styles;

		return(
			<View id={anime}>
				<Card style={cardStyle}>
					<ResponsiveImage
						width={Dimensions.get('window').width/2-10}
						height={0}
						source={ANIMES[anime]}
					>
						<Checker know={this.props.animes[anime]} onPress={()=>{this.onPress(anime)}}/>
					</ResponsiveImage>
					<Text style={textStyle}>{anime}</Text>
				</Card>
			</View>
		);
	}

	render() {
		
		const {
			containerStyle,
			galleryViewStyle,
			nameStyle,
			textStyle,
			cardStyle,
			labelTextStyle,
			footerStyle,
			checkerContainerStyle
		} = styles;

		//Pill is added with onpress handler that either goes back when in reconfigure mode or navigates to download page
		return (
			<Card style={{backgroundColor:'transparent'}}>
				<View style={containerStyle}>
					<Text style={textStyle}>So you ready to go?</Text>
					<Pill onPress={()=>{this.props.downloaded === 'reconfigure' ? this.props.back():this.props.download('downloading')}}>Let's Go!</Pill>
				</View>
			</Card>
		);
	}
}

const styles = {
	containerStyle: {
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height-60,
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	galleryViewStyle: {
		justifyContent:'space-around'
	},
	textStyle: {
		fontFamily: 'Avenir-Heavy',
		color: '#fff',
		fontSize: 20,
		marginBottom: 10,
	},
	cardStyle: {
		backgroundColor: 'transparent',
		marginBottom: 10,
		width:Dimensions.get('window').width/2-10,
	},
	footerStyle: {
		height: 40, 
		flexDirection: 'row',
		backgroundColor: '#fff'
	},
	checkerContainerStyle: {
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	}
}

const mapStateToProps = (state) => {

	let animes = {};

	for (var anime in animeList) {
		animes[anime] = state.main[anime];
	}

	return {animes, downloaded: state.main.downloaded };
}

export default connect(mapStateToProps,{setKnowAnime,navigate,download,back})(AnimeChecker);
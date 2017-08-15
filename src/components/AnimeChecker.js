import React, { Component } from 'react';
import { View, Text, Image, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Label, Checker, Pill } from './../common';
import ResponsiveImage from './../common/ResponsiveImage';
import { connect } from 'react-redux';
import { animeList } from './../reducers/AnimeList';
import { ANIMES } from './../../assets/animes/animes';
import { setKnowAnime, navigate, download, back } from './../actions';

class AnimeChecker extends Component {

	onPress(anime) {
		this.props.setKnowAnime(anime,!this.props.animes[anime]);
	}

	checkAll(value) {
		for(var anime in animeList) {
			this.props.setKnowAnime(anime,value);
		}
	}

	renderAnime(anime) {
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

		return (
			<Card style={{backgroundColor:'transparent',marginTop:20}}>
				<View style={containerStyle}>
					<FlatList
						data={Object.keys(this.props.animes)}
						renderItem={({item})=>{return this.renderAnime(item)}}
						keyExtractor={(item)=>item}
						numColumns={2}
						columnWrapperStyle={galleryViewStyle}
						initialNumToRender={4}
					/>
				</View>
				<View style={footerStyle}>
					<View style={checkerContainerStyle}>
						<Checker know={true} onPress={()=>{this.checkAll(true)}}/>
					</View>
					<Pill onPress={()=>{this.props.downloaded === 'reconfigure' ? this.props.back():this.props.download('downloading')}}>FINISHED!</Pill>
					<View style={checkerContainerStyle}>
						<Checker know={false} onPress={()=>{this.checkAll(false)}}/>
					</View>
				</View>
			</Card>
		);
	}
}

const styles = {
	containerStyle: {
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height-60,
	},
	galleryViewStyle: {
		justifyContent:'space-around'
	},
	textStyle: {
		fontFamily: 'Avenir-Heavy',
		color: '#fff',
		fontSize: 15,
		marginTop: 5,
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
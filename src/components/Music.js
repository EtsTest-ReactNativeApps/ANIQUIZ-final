import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Animated, TouchableOpacity, Easing, Image } from 'react-native';
import { Audio } from 'expo';

class Music extends Component {
	constructor(props) {
		super(props);

		this.state = {
			music: null,
			playing: false,
			reset: false,
			loaded: false,
			scale: new Animated.Value(0)
		}
	}

	async componentWillMount() {
		let music =  new Audio.Sound();
		await music.setOnPlaybackStatusUpdate(this.callback);
		await music.loadAsync(this.props.source);

		this.setState({music});
	}

	async componentWillUnmount() {
		await this.state.music.setOnPlaybackStatusUpdate(null); //setcallback to null to prevent callback after unmount
		await this.state.music.pauseAsync();
		await this.state.music.unloadAsync();
	}

	callback = status => {
		if(status.isLoaded) {
			this.setState({loaded: status.isLoaded, playing: status.isPlaying});
			if(status.didJustFinish) {
				this.setState({reset: true},()=>{
					this.state.music.stopAsync();
					this.state.scale.stopAnimation();
				});
			}
		}
	}

	repeatAnimation() {
		Animated.loop(
			Animated.sequence([
				Animated.timing(this.state.scale,{
					toValue: 1,
					easing: Easing.bounce,
					duration: 1000
				}),
				Animated.timing(this.state.scale,{
					toValue: 0,
					easing: Easing.bounce,
					duration: 1000
				})
			])
		).start();
	}

	onPress() {
		if(this.state.loaded) {
			if(this.state.playing) {
				this.state.music.pauseAsync();
				this.state.scale.stopAnimation();
			} else if (this.state.reset) {
				this.setState({reset:false},()=>{
					this.state.music.playAsync();
					this.repeatAnimation();
				});
			} else {
				this.state.music.playAsync();
				this.repeatAnimation();
			}
		}
	}

	getPlayerStyle() {
		const { scale } = this.state;
		const s = scale.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [1, 0.6, 1]
		});

		return {
			transform: [{ scale:s }]
		}
	}

	render() {
		return (
			<TouchableOpacity onPress={()=>{this.onPress()}}>
				<View style={styles.centerStyle}>
					<Animated.View style={[styles.backgroundStyle,this.getPlayerStyle()]}/>
					<View style={styles.innerStyle}>
						{this.state.reset ? 
							<Ionicons name="md-repeat" size={25} color="white" /> :
							(this.state.playing ?
								<Ionicons name="md-pause" size={25} color="white" /> :
								<Ionicons name="md-play" size={25} color="white" />
							) 
						}
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = {
	backgroundStyle: {
		backgroundColor: '#FE2B53',
		opacity: 0.5,
		height: 70,
		width: 70,
		borderRadius: 35,
	},
	innerStyle: {
		height: 45,
		width: 45,
		borderRadius: 25,
		backgroundColor: '#FE2B53',
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center'
	},
	centerStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 7,
		elevation: 7
	},
	iconStyle: {
		height: 21,
		width: 21
	}
}

export default Music;
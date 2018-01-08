import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, TouchableWithoutFeedback, UIManager, LayoutAnimation, Platform } from 'react-native';
import { connect } from 'react-redux';
import { checkAnswer, setHint, resetAnswer } from './../actions';
import { ImageSection, Result } from './../common';
import ResponsiveImage from './../common/ResponsiveImage';
import Music from './../components/Music';
import Hint from './../common/Hint';

const CARD_WIDTH = Dimensions.get('window').width;
const CARD_HEIGHT = Dimensions.get('window').height - 100;

class Quiz extends Component {

	constructor(props) {
		super(props);

		this.state = { 
			answer: null,
			hint: false,
			selectedOptions: []
		};
	}

	componentWillUnmount() {
		this.props.resetAnswer();
	}

	componentWillUpdate(nextProps,nextState) {
    	UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    	if (nextState.answer !== this.state.answer) {
    		LayoutAnimation.easeInEaseOut();
    	} else {
    		LayoutAnimation.spring();
    	}
  	}

	componentDidUpdate() {
		if (this.state.selectedOptions.length === this.props.answers.length) {
			let answer = true;
			for (var i = 0; i < this.state.selectedOptions.length; i++) {
				if (this.state.selectedOptions[i] !== this.props.answers[i]) {
					answer = false;
				} 
			}
			if (this.state.answer !== answer) {
				this.setState({answer});
				this.props.checkAnswer(answer,this.props.anime);
				this.props.setHint(false);
			} 
		}

		if (this.props.hint && (this.props.id -1 === this.props.index) && !this.state.hint) {
			this.setState({hint:true});
		}
	}

	selectOption(option) {
		this.setState({selectedOptions: [...this.state.selectedOptions, option]});
	}

	renderFloatElement() {
		if (this.props.deck === 'Character') {
			if (this.props.hint) {
				return (
					<View style={{height:35,width:48}}>
						<Image style={{height:35,width:35}} source={require('./../../assets/icons/hint_used.png')}/>
					</View>
				);
			} else {
				return (
					<Hint/>
				);
			}
		} else if (this.props.deck === 'Music') {
			return (
				<Music source={this.props.music}/>
			);
		} else {
			return null;
		}
	}

	renderResponsiveImage(i,height) {
		return (
			<ResponsiveImage
				resizeMode="cover"
				source={this.props.source[i]}
				width={CARD_WIDTH}
				height={height/2}
			/>
		);
	}

	renderImage() {
		const height = this.props.deck === 'Character' ? CARD_HEIGHT : 0;

		if(this.props.deck === 'Character') {
			if (this.state.hint) {
				return this.renderResponsiveImage(1,height);
			} else if (Platform.OS === 'ios') {
				return (
					<View>
						{this.renderResponsiveImage(0,height)}
					</View>
				);
			} else {
				return this.renderResponsiveImage(0,height);
			}
		} else {
			return (
				<View style={{elevation:1,zIndex:1}}>
					<ImageSection width={CARD_WIDTH} height={height} source={this.props.source}/>
				</View>
			);
		}
	}

	renderContent() {
		const styles = {
			titleStyle: {
				fontFamily: 'Avenir-Heavy',
				color: '#fff',
				fontSize: 25,
				textAlign: 'center',
				margin: 3
			},
			questionStyle: {
				fontFamily: 'Avenir-Medium',
				color: '#fff',
				fontSize: 17,
				textAlign: 'center'
			},
			questionContainerStyle: {
				shadowColor: '#000',
				shadowOffset: {
					width: 0,
					height: 2
				},
				shadowRadius: 4,
				shadowOpacity: 0.5,
				backgroundColor: '#8C88FF',
				height: (this.props.deck === 'Character' ? 55 : 85),
				elevation: 3,
				alignItems: 'center',
				justifyContent: 'center'
			},
			optionTextStyle: {
				fontFamily: 'Avenir-Medium',
				color: '#333',
				fontSize: 20,
				textAlign: 'center',
				margin: 5
			},
			optionStyle: {
				flex: 1,
				borderTopWidth: 1,
				borderBottomWidth: 1,
				borderColor: 'rgba(0,0,0,0.05)',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'transparent',
			},
			cardStyle: {
				height: CARD_HEIGHT,
				width: CARD_WIDTH,
				backgroundColor: '#fff',
			    shadowColor: '#000',
			    shadowOffset: {
			      width: 0,
			      height: 2
			    },
			    shadowRadius: 8,
			    shadowOpacity: 0.5,
			    elevation: 3
			},
			optionContainerStyle: {
				flex:1
			},
			floatStyle: {
				position: 'absolute',
				zIndex: 100,
				elevation: 100,
				right: 7,
				top: (Platform.OS === 'android' ? undefined : (this.props.deck === 'Music' ? -40 : -20))
			}
		};
		const {
			titleStyle,
			questionStyle,
			questionContainerStyle,
			cardStyle,
			optionContainerStyle,
			optionStyle,
			optionTextStyle,
		} = styles;

		const {
			title,
			question,
			options,
			images,
			deck,
			music,
			source
		} = this.props;

		if(this.state.answer === null) {
			return (
				<View style={cardStyle}>
					<View>
						<View>
							{this.renderImage()}
						</View>
						<TouchableWithoutFeedback>
							<View style={questionContainerStyle}>
								<Text style={titleStyle}>{title}</Text>
								{deck === 'Character' ? null : <Text style={questionStyle}>{question}</Text> }
								<View style={styles.floatStyle}>
									{this.renderFloatElement()}
								</View> 
							</View>
						</TouchableWithoutFeedback>
					</View>
					<View style={optionContainerStyle}>
						{options.map((option)=>{
							return(
								<TouchableOpacity 
									key={option} 
									onPress={()=>{this.selectOption(option)}} 
									style={optionStyle}
								>
									<Text style={optionTextStyle}>
										{option}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				</View>
			);
		} else if (this.state.answer) {
			return (
				<View style={cardStyle}>
					<Result correct />
				</View>
			);
		} else {
			return (
				<View style={cardStyle}>
					<Result wrong />
				</View>
			);
		}
	}

	render() {
		return (
			<View>
				{this.renderContent()}
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const { answer, deck, hint, index } = state.quiz;

	return { answer, deck, hint, index };
}

export default connect(mapStateToProps,{checkAnswer,setHint,resetAnswer})(Quiz);
import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, TouchableWithoutFeedback, UIManager, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { checkAnswer, setHint, resetAnswer } from './../actions';
import { ImageSection, Result } from './../common';
import ResponsiveImage from './../common/ResponsiveImage';
import Music from './../components/Music';
import Hint from './../common/Hint';
import cacheAssets from './../../utilities/cacheAssets';

const CARD_WIDTH = Dimensions.get('window').width - 10;
const CARD_HEIGHT = Dimensions.get('window').height - 100;

class Quiz extends Component {

	async loadAssets() {
		await cacheAssets({images: this.props.source});
	}

	constructor(props) {
		super(props);

		this.state = { 
			answer: null,
			hint: false,
			selectedOptions: []
		};
	}

	componentWillMount() {
		this.loadAssets();
	}

	componentWillUnmount() {
		this.props.resetAnswer();
	}

	componentWillUpdate(nextProps,nextState) {
    	UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    	if (nextState.answer !== this.state.answer) {
    		LayoutAnimation.easeInEaseOut();
    	} else if (nextState.hint !== this.state.hint) {

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
				this.props.checkAnswer(answer);
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

	renderImage() {
		const height = this.props.deck === 'Character' ? CARD_HEIGHT : 0;

		if(this.props.deck === 'Character') {
			if (this.state.hint) {
				return (
					<ResponsiveImage
						resizeMode="cover"
						source={this.props.source[1]}
						width={CARD_WIDTH}
						height={height/2}
					/>
				);
			} else {
				return (
					<View>
						<ResponsiveImage
							resizeMode="cover"
							source={this.props.source[0]}
							width={CARD_WIDTH}
							height={height/2}
						/>
					</View>
				);
			}
		} else {
			return (
				<ImageSection width={CARD_WIDTH} height={height} source={this.props.source}/>
			);
		}
	}

	renderContent() {
		const styles = {
			titleStyle: {
				fontFamily: 'Avenir-Heavy',
				color: '#fff',
				fontSize: 25,
				textAlign: 'center'
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
			},
			optionStyle: {
				flex: 1,
				borderTopWidth: 1,
				borderBottomWidth: 1,
				borderColor: 'rgba(0,0,0,0.05)',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'transparent'
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
				elevation: 4,
				right: 7,
				top: (this.props.deck === 'Music' ? -40 : -20)
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
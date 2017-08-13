import React, { Component } from 'react';
import { View, Text, Image, Dimensions, Animated } from 'react-native';
import { connect } from 'react-redux';
import { navigate, download } from './../actions';
import Swiper from './../components/Swiper';
import { Pill, Card } from './../common';
import ResponsiveImage from './../common/ResponsiveImage';
import Download from './../components/Download';

class TutorialScreen extends Component {

	render() {
		let pack = [{id:'1',img:require('./../../assets/backgrounds/t1.png')},{id:'2',img:require('./../../assets/backgrounds/t2.png')},{id:'3',img:require('./../../assets/backgrounds/t3.png')},{id:'4',img:require('./../../assets/backgrounds/t4.png')},{id:'5',img:require('./../../assets/backgrounds/t5.png')}];
		let condition = this.props.index >= pack.length;
		return(
			<Image style={styles.imageStyle} blurRadius={3} source={require('./../../assets/backgrounds/1.png')}>
				<View style={styles.backgroundStyle}></View>
				<View style={styles.launcherContainer}>
					<View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,marginTop:65}}>
						<Swiper
			              pack={pack}
			              condition={condition}
			              renderQuiz={item=>{
			                return(
			                  <Animated.View>
			                    <Card key={item.id} style={{backgroundColor:'#4B4097'}}>
			                    	<ResponsiveImage 
			                    		source={item.img} 
			                    		width={Dimensions.get('window').width} 
			                    		height={0}
			                    	/>
			                    </Card>
			                  </Animated.View>
			                  );
			                }
			              }
			            />
		            </View>
	            </View>
	            {this.props.downloaded === 'downloading' || this.props.downloaded === 'downloaded' ? 
	            	<View style={[styles.downloadStyle,{backgroundColor: this.props.downloaded === 'downloaded' ? '#45B39C' : '#fff'}]}>
	            		<Download/>
	            	</View> 
	            : null}
			</Image>
		);
	}
}

const styles = {
	downloadStyle: {
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
		backgroundColor:'#fff',
		position: 'absolute',
		zIndex: 99,
		alignItems: 'center',
		justifyContent: 'center'
	},
	launcherContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2,
		position: 'absolute',
		top: 0, left: 0, right: 0, bottom: 0,
	},
	backgroundStyle: {
		flex: 1,
		opacity: 0.5,
		backgroundColor: '#4B4097',
		zIndex: 1,
	},
	imageStyle: {
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	},
	logoStyle: {
		height: 253,
		width: 250,
		backgroundColor: 'transparent',
		opacity:1
	},
	textStyle: {
		color: '#FFFFFF',
		fontFamily: 'Avenir-Medium',
		fontSize: 44,
		textAlign: 'center',
		backgroundColor: 'transparent',
		margin: 7
	},
}

const mapStateToProps = (state) => {
	return { index: state.quiz.index, downloaded: state.main.downloaded }
}

export default connect(mapStateToProps,{ navigate })(TutorialScreen);
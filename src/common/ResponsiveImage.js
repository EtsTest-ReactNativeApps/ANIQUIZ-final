import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback, UIManager, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { navigate, selectLightboxImage } from './../actions';

class ResponsiveImage extends Component {
	constructor() {
		super();

		this.state = {
			width: 0,
			height: 0,
		}
	}

	navigate() {
		this.props.navigate('lightbox'); 
		this.props.selectLightboxImage(this.props.source);
	}

	componentWillUpdate() {
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
		LayoutAnimation.easeInEaseOut();
	}

	componentWillMount() {
		
		Image.prefetch(this.props.source.uri);
		Image.getSize(this.props.source.uri,(width,height)=>{
			if (this.props.height === 0) {
				this.setState({width:this.props.width+1});
				this.setState({height:((this.props.width/width)*height+1)});
			} else {
				this.setState({width:((this.props.height/height)*width+1)});
				this.setState({height:this.props.height+1});
			}
		},(error)=>{console.log(error)});
	}

	render() {

		return(
			<View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#fff'}}>
				<View style={{width:this.state.width,height:this.state.height}}>
					{this.props.lightbox ?
						<TouchableWithoutFeedback onPress={()=>{this.navigate()}} > 
							<Image resizeMode="cover" style={{width:this.state.width,height:this.state.height}} source={this.props.source}>
								{this.props.children}
							</Image>
						</TouchableWithoutFeedback> :
						<Image resizeMode="cover" style={{width:this.state.width,height:this.state.height}} source={this.props.source}>
							{this.props.children}
						</Image>
					}
				</View>
			</View>
		);
	}
}

export default connect(null,{navigate,selectLightboxImage})(ResponsiveImage);
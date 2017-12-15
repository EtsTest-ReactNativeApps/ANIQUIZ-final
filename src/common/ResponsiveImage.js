import React, { Component } from 'react';
import { View, Image, Platform, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { navigate, selectLightboxImage } from './../actions';
import resolveAssetSource from 'resolveAssetSource';

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
		if(Platform.OS === 'ios') {
			LayoutAnimation.easeInEaseOut();
		}
	}

	setDimensions(width,height) {
		if (this.props.height === 0) {
			this.setState({width:this.props.width+1});
			this.setState({height:((this.props.width/width)*height+1)});
		} else {
			this.setState({width:((this.props.height/height)*width+1)});
			this.setState({height:this.props.height+1});
		}
	}

	componentWillMount() {
		if (this.props.source === undefined) {
			return;
		} else if(this.props.source.uri !== undefined) {
			Image.getSize(this.props.source.uri,(width,height)=>{
				this.setDimensions(width,height);
			},(error)=>{console.log(error)});
		} else {
			let img = resolveAssetSource(this.props.source);
			this.setDimensions(img.width,img.height);
		}
	}

	render() {
		const styles = {
			centerStyle: {
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#fff'
			},
			fixedStyle: {
				width:this.state.width,
				height:this.state.height
			}
		}

		return(
			<View style={styles.centerStyle}>
				{this.props.lightbox ?
					<TouchableWithoutFeedback onPress={()=>{this.navigate()}} > 
						<Image resizeMode="cover" style={styles.fixedStyle} source={this.props.source}>
							{this.props.children}
						</Image>
					</TouchableWithoutFeedback> :
					<Image resizeMode="cover" style={styles.fixedStyle} source={this.props.source}>
						{this.props.children}
					</Image>
				}
			</View>
		);
	}
}

export default connect(null,{navigate,selectLightboxImage})(ResponsiveImage);
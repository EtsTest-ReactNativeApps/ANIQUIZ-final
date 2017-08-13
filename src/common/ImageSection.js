import React from 'react';
import { View } from 'react-native';
import { Label } from './Label';
import ResponsiveImage from './ResponsiveImage'; 

const ImageSection = (props) => {
	const width = props.width;
	const height = props.height;

	const styles = {
		labelStyle: {
			position: 'absolute',
			margin: 2,
			zIndex: 2,
			justifyContent: 'flex-start'
		}
	};
	if(props.source.length === 1) {
		return(
			<ResponsiveImage
				lightbox
				resizeMode="cover"
				source={props.source[0]}
				width={width}
				height={height/2}
			/>
		);
	} else {
		return (
			<View>
				<View style={{flexDirection:'row'}}>
					<ResponsiveImage
						lightbox 
						source={props.source[0]}
						width={width/2}
						height={height/2}
					>
						<View style={styles.labelStyle}><Label color="#fff">1</Label></View>
					</ResponsiveImage>
					<ResponsiveImage
						lightbox 
						source={props.source[1]}
						width={width/2}
						height={height/2}
					>
						<View style={styles.labelStyle}><Label color="#fff">2</Label></View>
					</ResponsiveImage>
				</View>
				<View style={{flexDirection:'row'}}>
					<ResponsiveImage
						lightbox 
						source={props.source[2]}
						width={width/2}
						height={height/2}
					>
						<View style={styles.labelStyle}><Label color="#fff">3</Label></View>
					</ResponsiveImage>
					<ResponsiveImage
						lightbox 
						source={props.source[3]}
						width={width/2}
						height={height/2}
					>
						<View style={styles.labelStyle}><Label color="#fff">4</Label></View>
					</ResponsiveImage>
				</View>
			</View>
		);
	}
	
}

export { ImageSection };
import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SQLite, FileSystem } from 'expo';
import { Loading } from './../common';
import { connect } from 'react-redux';
import { download, back } from './../actions';

class Download extends Component {

	async loadDB() {
		await this.makeSQLiteDirAsync();
		await FileSystem.downloadAsync(
		  'https://github.com/RE-N-Y/final/blob/master/db.db?raw=true',
		  FileSystem.documentDirectory + 'SQLite/anime.db'
		).then(({ uri }) => {
		    console.log('Finished downloading to ', uri);
		});
		try {
			const message = await FileSystem.getInfoAsync(FileSystem.documentDirectory+'SQLite/anime.db');
			console.log(message);
			const db = await SQLite.openDatabase('anime.db');

			db.transaction(tx => {
		        tx.executeSql(
		          'select * from Q limit 0,2',
		          [],
		          (_, { rows }) => {
		            console.log(JSON.stringify(rows));
		          }
		        );
	      	},(error)=>{console.log(error)},()=>{console.log('success');this.props.download('downloaded')});
		} catch(e) {
			console.log('error!');
			console.log(e);
		}
		
  	}

	async makeSQLiteDirAsync() {
	  	const dbTest = SQLite.openDatabase('key.db');
	    await dbTest.transaction(tx => tx.executeSql(''));
	}

	async componentWillMount() {
		await this.loadDB();
	}

	render() {
		return(
			<View style={styles.viewStyle}>
				<View style={styles.viewStyle}/>
				{this.props.downloaded === 'downloaded' ? 
					<View style={styles.downloadContainerStyle}>
						<TouchableOpacity onPress={()=>{this.props.back()}} style={styles.viewStyle}>
							<Image style={styles.iconStyle} source={require('./../../assets/icons/correct.png')}/>
							<Text style={styles.textStyle}>COMPLETE!</Text>
						</TouchableOpacity>
						<View style={styles.viewStyle}/>
					</View>
					:
					<View style={styles.downloadContainerStyle}>
						<View style={styles.viewStyle}>
							<ActivityIndicator size="large"/>
						</View>
						<View style={{flex:1, justifyContent:'flex-end'}}>
							<Loading/>
						</View>
					</View>
				}
			</View>
		);
	}
}

const styles = {
	viewStyle: {
		flex:1,
		alignItems:'center',
		justifyContent:'center'
	},
	downloadContainerStyle: {
		flex: 2
	},
	iconStyle: {
		height: 50,
		width: 50
	},
	textStyle: {
		fontFamily: 'Avenir-Light',
		fontSize: 20,
		color:'#fff',
		marginTop:5
	}
}

const mapStateToProps = (state) => {
	return { downloaded: state.main.downloaded }
}

export default connect(mapStateToProps,{download,back})(Download);
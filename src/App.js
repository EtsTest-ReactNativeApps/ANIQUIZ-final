import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { SQLite, FileSystem } from 'expo';
import { Router } from './Router';
import { connect } from 'react-redux';
import { APP_READY } from './actions/types';
import { addNavigationHelpers } from 'react-navigation';
import cacheAssets from './../utilities/cacheAssets';
//import { DB } from './../db';

class App extends Component {
	//loadAsset method, uses import from utilities
	async loadAssets() {
		await cacheAssets({
			images: [
				require('./../assets/backgrounds/bg.png'),
				require('./../assets/icons/correct.png'),
				require('./../assets/icons/wrong.png'),
				require('./../assets/backgrounds/1.png'),
				require('./../assets/backgrounds/2.jpg'),
				require('./../assets/backgrounds/3.jpg'),
				require('./../assets/icons/anime.png'),
				require('./../assets/icons/music.png'),
				require('./../assets/icons/standard.png'),
				require('./../assets/icons/hint.png'),
				require('./../assets/icons/hint_used.png')
			],
			fonts: [
				{'Avenir-Light': require('./../assets/fonts/Avenir-Light.ttf')},
				{'Avenir-Heavy': require('./../assets/fonts/Avenir-Heavy.ttf')}, 
				{'Avenir-Book': require('./../assets/fonts/Avenir-Book.ttf')},
				{'Avenir-Medium': require('./../assets/fonts/Avenir-Medium.ttf')},
				Ionicons.font
			]
		});
	}

	async componentWillMount() {
		//first wait until asset is loaded
		await this.loadAssets();
		//then, dispatch an action to make the app ready to start!
		this.props.dispatch({type:APP_READY});
		/*DB.transaction(tx => {
	      tx.executeSql(
	        'drop table Q;'
	      );
	    });*/
	    

		/*DB.transaction(tx => {
	      tx.executeSql(
	        'create table if not exists Q (id integer primary key not null, question text, options text, answers text, source text, music text, anime text, category text);'
	      );
	    });*/
	}
	
	render() {
		//return Router when app is ready
		return (
			<View style={{flex:1}}>
				{this.props.ready ? 
					<Router
						navigation={addNavigationHelpers({
							dispatch: this.props.dispatch,
							state: this.props.nav
						})}
					/> 
				: null}
			</View>
		);
	}

}

const mapStateToProps = (state) => {
	return { nav: state.nav, ready: state.app.ready };
};

export default connect(mapStateToProps)(App);
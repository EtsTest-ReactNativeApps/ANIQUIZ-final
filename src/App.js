import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo';
import { View } from 'react-native';
import { Router } from './Router';
import { download } from './actions';
import { connect } from 'react-redux';
import { APP_READY } from './actions/types';
import { addNavigationHelpers } from 'react-navigation';
import cacheAssets from './../utilities/cacheAssets';
import { Asset } from './../utilities/enhancedAsset';
import { DB } from './../db';

class App extends Component {
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
		this.props.dispatch({type:APP_READY});
	}

	async makeSQLiteDirAsync() {
	    const dbTest = SQLite.openDatabase('dummy.db');

	    try {
	      await dbTest.transaction(tx => tx.executeSql(''));
	    } catch(e) {
	        console.log('error while executing SQL in dummy DB');
	        console.log(e.message);
	    }
  	}

	componentWillMount() {
		this.loadAssets();

		if (this.props.download) {

		}

		/*DB.transaction(tx => {
	      tx.executeSql(
	        'drop table Q;'
	      );
	    });*/

		DB.transaction(tx => {
	      tx.executeSql(
	        'create table if not exists Q (id integer primary key not null, question text, options text, answers text, source text, music text, anime text, category text);'
	      );
	    });
	}

	render() {
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
	return { nav: state.nav, ready: state.app.ready, main: state.main };
};

export default connect(mapStateToProps,{})(App);
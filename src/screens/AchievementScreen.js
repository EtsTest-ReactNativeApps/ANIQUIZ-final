import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { ImagePicker } from 'expo';
import { DB } from './../../db';

class Questions extends Component {

	constructor(props) {
		super(props);

		this.state = {
			questions: null
		}
	}

	componentDidMount() {
		this.reload();
	}

	reload() {
		DB.transaction(tx => {
	      tx.executeSql(
	        `select * from Q;`,
	        [],
	        (_, { rows: { _array } }) => this.setState({ questions: _array })
	      );
    	});
	}

	onPress(id) {
		DB.transaction(tx => {
	      tx.executeSql(`delete from Q where id = ?;`,[id]);
    	},null,this.reload());
	}

	render() {
		if (this.state.questions === null) {
			return null;
		}

		return (
			<View>
				{this.state.questions.map(({id,question,options,answers,anime})=>{
					return (
						<TouchableOpacity onLongPress={()=>{this.onPress(id)}} key={id} style={{padding:10,borderColor:'#333',borderWidth:2}}>
							<Text>{question}</Text>
							<Text>{options}</Text>
							<Text>{answers}</Text>
							<Text>{anime}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}
}

class AchievementScreen extends Component {
	constructor() {
		super();

		this.state = {
			question: '',
			options: '',
			answers: '',
			img1: null,
			img2: null,
			img3: null,
			img4: null,
			music: '',
			category: '',
			anime: ''
		}
	}

	static navigationOptions = {
		tabBarIcon: ({ tintColor }) => (
	      <Image
	        source={require('./../../assets/icons/achievement_icon.png')}
	        style={[{width:21,height:23}, {tintColor: tintColor}]}
	      />
	    )
	}

	onPress() {
		const {
			question,
			options,
			answers,
			img1,
			img2,
			img3,
			img4,
			music,
			category,
			anime
		} = this.state;

		DB.transaction(tx => {
			tx.executeSql('insert into Q (question,options,answers,source,music,anime,category) values (?,?,?,?,?,?,?)', [question,options,answers,(img1+','+img2+','+img3+','+img4),music,anime,category]);
		    tx.executeSql('select * from Q');
	  	},null,this.questions.reload());

	  	this.setState({question:'',options:'',answers:'',music:'',anime:'',img1:null,img2:null,img3:null,img4:null});
	}

	upload = async (imgNum) => {
		let result = await ImagePicker.launchImageLibraryAsync({base64:true});

		if (imgNum===1) {
			this.setState({img1:result.base64});
		} else if (imgNum===2) {
			this.setState({img2:result.base64});
		} else if (imgNum===3) {
			this.setState({img3:result.base64});
		} else {
			this.setState({img4:result.base64});
		}
		console.log(result);
	}

	render() {
		const {
			question,
			options,
			answers,
			images,
			music,
			anime,
			category
		} = this.state;

		return (
			<View style={styles.viewStyle}>
				<TextInput placeholder="question" value={question} style={styles.inputStyle} onChangeText={(question)=>{this.setState({question})}}/>
				<TextInput placeholder="options" value={options} style={styles.inputStyle} onChangeText={(options)=>{this.setState({options})}}/>
				<TextInput placeholder="answers" value={answers} style={styles.inputStyle} onChangeText={(answers)=>{this.setState({answers})}}/>
				<View style={{height:40,flexDirection:'row'}}>
					<TouchableOpacity style={styles.uploadStyle} onPress={()=>{this.upload(1)}}><Text>Img1</Text></TouchableOpacity>
					<TouchableOpacity style={styles.uploadStyle} onPress={()=>{this.upload(2)}}><Text>Img2</Text></TouchableOpacity>
					<TouchableOpacity style={styles.uploadStyle} onPress={()=>{this.upload(3)}}><Text>Img3</Text></TouchableOpacity>
					<TouchableOpacity style={styles.uploadStyle} onPress={()=>{this.upload(4)}}><Text>Img4</Text></TouchableOpacity>
				</View>
				<TextInput placeholder="music" value={music} style={styles.inputStyle} onChangeText={(music)=>{this.setState({music})}}/>
				<TextInput placeholder="anime" value={anime} style={styles.inputStyle} onChangeText={(anime)=>{this.setState({anime})}}/>
				<TextInput placeholder="category" value={category} style={styles.inputStyle} onChangeText={(category)=>{this.setState({category})}}/>
				<TouchableOpacity onPress={this.onPress.bind(this)}><Text>Submit</Text></TouchableOpacity>
				<ScrollView>
					<Questions ref={questions => this.questions = questions} />
				</ScrollView>
			</View>
		);
	}
}

const styles = {
	inputStyle:{
		padding:5,
		borderColor: '#333',
		borderWidth: 2,
		height: 40
	},
	uploadStyle: {
		padding:5,
		borderColor: '#333',
		borderWidth: 2,
		height: 40,
		flex: 1
	},
	viewStyle: {
		flex:1,
		paddingTop:65
	}
}

export default AchievementScreen;
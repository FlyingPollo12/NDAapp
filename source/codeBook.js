import React, {Component} from 'react';
import {
	View,
	SafeAreaView,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import Pdf from 'react-native-pdf';

import {COLORS} from './colors.js';


const codebookRequire = {uri: "bundle-assets://Handbook.pdf"}

export default class CodeBook extends Component {
	callBack = (msg) => this.props.callBack(msg);

	render() {
		return (
			<SafeAreaView style={styles.page}>
				<View style={{flexDirection: 'row'}}>
				<TouchableOpacity style={styles.button} onPress={() => this.callBack("close")}>
					<Text style={styles.text}>Back</Text>
				</TouchableOpacity>
				<View style={{flex: 5, backgroundColor: 'white'}}/>
				</View>
				<Pdf
					style={styles.pdf}
					source={codebookRequire}
					onLoadComplete={(numPages, filePath) => {
						console.log("numPages: " + numPages);
					}}
					onError={(error) => {
						console.log(error);
					}}
				/>
			</SafeAreaView>
		);
	}
}


const styles = StyleSheet.create({
	page: {
		flex: 1,
		margin: 0,
		padding: 0,
	},
	button: {
		zIndex: 2,
		flex: 1,
		//position: 'absolute',
		//top: 0,
		//left: 0,
		padding: 15,
		paddingLeft: 30,
		paddingRight: 30,
		backgroundColor: COLORS.NDA_BLUE,
	},
	text: {
		fontSize: 20,
		textAlign: 'center',
		color: 'white',
	},
	pdf: {
		flex: 1,
	},
})
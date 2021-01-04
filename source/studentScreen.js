import React, {Component} from 'react';
import { Text,
	View,
	SafeAreaView,
    ScrollView,
	Image,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from './colors.js';     //Color Sheet
import SideMenu from './sideMenu.js';
import Pdf from 'react-native-pdf';

import Header from './header.js';
import CodeBook from './codeBook.js';



const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default class newPage extends Component {
	constructor(props: Props) {
		super(props);
		this.state={
			isCodeBookVisible: false,
		}
	}
	

	render() {
		return (
			<SafeAreaView style={styles.page}>
				<Modal
					style={styles.codeBookModal}
					isVisible= {this.state.isCodeBookVisible}
				>
					<CodeBook callBack={this.codeBookCallBack} />
				</Modal>
				<Header callBack={this.headerCallBack} />
				<View style={{height: 124}}/>
				<TouchableOpacity style={styles.button} onPress={() => this.toggleCodeBook()}>
					<Text style={styles.buttonText}>Code Book</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
	
	codeBookCallBack = (msg) => {
		if (msg == "close")
			this.toggleCodeBook();
	}
	
	headerCallBack = (msg) => {
		if (msg == "donationScreen") {
			this.props.navigation.navigate("donationScreen");
		}
		else if (msg == "homeScreen") {
			this.props.navigation.popToTop();
		}
		else if (msg == "parentScreen") {
			this.props.navigation.navigate("parentScreen");
		}
		else if (msg == "studentScreen") {
			this.props.navigation.navigate("studentScreen");
		}
		else if (msg == "alumniScreen") {
			this.props.navigation.navigate("alumniScreen");
		}
		else if (msg == "goback") {
			this.props.navigation.goBack();
		}
	}
	
	toggleCodeBook = () => {
		this.setState({ isCodeBookVisible: !this.state.isCodeBookVisible });
	}
}


const styles = StyleSheet.create({
	page:{ 
	},
	codeBookModal: {
		margin: 0,
		width: WIDTH,
		height: HEIGHT,
	},
	button: {
		margin: 20,
		marginLeft: 40,
		marginRight: 40,
		padding: 20,
		backgroundColor: COLORS.NDA_BLUE,
	},
	buttonText: {
		fontSize: 34,
		textAlign: 'center',
		color: 'white',
	},
})
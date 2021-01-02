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

import Header from './header.js';



const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;


export default class newPage extends Component {
	constructor(props: Props) {
		super(props);
		this.state={
		}
	}
	

	render() {
		return (
			<SafeAreaView>
				<Header callBackFunction={this.headerCallBackFunction} />
			</SafeAreaView>
		);
	}
	
	
	headerCallBack = (msg) => {
		if (msg == "donationScreen") {
			this.props.navigation.navigate("donationScreen");
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
}
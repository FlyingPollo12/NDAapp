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

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;


export default class newPage extends Component {
	constructor(props: Props) {
		super(props);
		this.state={
			amount: "0.00",
		}
	}
	
	
	render() {
		return (
			<SafeAreaView>
			</SafeAreaView>
		);
	}
}
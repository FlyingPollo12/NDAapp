import React, {Component} from 'react';
import {
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';



export default class menu extends Component {
	constructor(props: Props) {
		super(props);
		this.state = {
			tmp: "something",
		};
	}
	
	render() {
		return (
			<SafeAreaView>
				<Text style={styles.title}>Lunch Menu</Text>
				<Text style={styles.date}>for 1/24/2021</Text>
				<View style={styles.daySection}>
					<Text style={styles.mealDesc}>Eggs and biscuits</Text>
					<Text style={styles.option}></Text>
					<Text style={styles.option}></Text>
				</View>
			</SafeAreaView>
		)
	}
}
import React, {Component} from 'react';
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { requestOneTimePayment } from 'react-native-paypal';



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
				<Text style={styles.title}>Welcome, give us money now plz :)</Text>
				<View style={{flexDirection: 'row'}}>
					<View style={{flex: 1}}></View>
					<Text style={styles.input}>Amount: </Text>
					<TextInput
						style={styles.input}
						keyboardType={"numeric"}
						value={this.state.amount}
						onChangeText={(text) => this.setState({ amount: text }) }
					/>
					<View style={{flex: 1}}></View>
				</View>
				<TouchableOpacity style={styles.button} onPress={() => this.processPayment()}>
					<Text style={styles.buttonText}>Donate</Text>
				</TouchableOpacity>	
			</SafeAreaView>
		);
	}
	
	async processPayment() {
		const {
			nonce,
			payerId,
			email,
			firstName,
			lastName,
			phone,
		} = await requestOneTimePayment(
			token,
			{
				amount: this.state.amount,
				currency: 'USD',
				localeCode: 'en_US',
				shippingAddressRequired: false,
				userAction: 'commit',
				intent: 'authorize',
			}
		);
	}
}


const styles = StyleSheet.create({
	page: {
	
	},
	title: {
		fontSize: 42,
		color: 'red',
		padding: 15,
		textAlign: 'center',
		backgroundColor: 'black',
	},
	input: {
		flex: 2,
		marginTop: 25,
		borderWidth: 1,
		borderRadius: 4,
		fontSize: 20,
		padding: 12,
	},
	button: {
		backgroundColor: 'blue',
		padding: 20,
		margin: 20,
		marginLeft: 40,
		marginRight: 40,
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: 'yellow',
	},
})
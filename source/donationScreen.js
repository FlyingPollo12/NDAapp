import React, {Component} from 'react';
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Modal from 'react-native-modal';
import { requestOneTimePayment } from 'react-native-paypal';


let HEIGHT = Dimensions.get("window").height;
let WIDTH = Dimensions.get("window").width;

export default class newPage extends Component {
	constructor(props: Props) {
		super(props);
		this.state={
			amount: "0.00",
			showModal: false,
			status: "Pending",
		}
	}
	
	handleResponse = data => {
		if (data.title == "success") {
			this.setState({ showModal: false, status: "Complete" });
		} else if (data.title == "cancel") {
			this.setState({ showModal: false, status: "Cancelled" });
		} else {
			return;
		}
	};
	
	render() {
		return (
			<SafeAreaView>
				<Modal style={styles.webview}
					isVisible= {this.state.showModal}
					onRequestClose={() => this.setState({ showModal: false })}
					onBackdropPress={() => this.toggleModal()}
				>
					<WebView
						style={styles.webview}
						ref={webView => (this.webView = webView)}
						source={{ uri: "http://localhost:3000" }}
						onNavigationStateChange={(data) => this.handleResponse(data)}
						injectedJavaScript={`document.f1.submit()`}
						onLoadEnd={() => this.webView.postMessage(this.state.amount)}
					/>
				</Modal>
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
				<Text>Payment Status: {this.state.status}</Text>
			</SafeAreaView>
		);
	}
	
	processPayment() {
		this.setState({ showModal: true });
	}
	
	toggleModal() {
		this.setState({ showModal: false });
	}
}


const styles = StyleSheet.create({
	page: {
	
	},
	webview: {
		marginTop: 20,
		marginLeft: 50,
		width: WIDTH * 0.8,
		height: HEIGHT * 0.6,
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
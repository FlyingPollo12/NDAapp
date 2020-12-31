import React, {Component} from 'react';
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Image,
	ImageBackground,
	Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Modal from 'react-native-modal';
import { requestOneTimePayment } from 'react-native-paypal';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLORS } from './colors.js';
import Header from './header.js';



let HEIGHT = Dimensions.get("window").height;
let WIDTH = Dimensions.get("window").width;

export default class newPage extends Component {
	constructor(props: Props) {
		super(props);
		this.state={
			amount: "0.00",
			showModal: false, //for webview
			status: "Pending",
		}
	}
	
	handleResponse = data => {
		console.log("handleResponse()");
		console.log(data.title);
		if (data.title == "return") {
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
						source={{ uri: "https://slashsolutions.co/NDApaypal/" }}
						onNavigationStateChange={(data) => this.handleResponse(data)}
						injectedJavaScript={`document.paypal_form.submit()`}
						onLoadEnd={() => this.webView.postMessage(this.state.amount)}
					/>
				</Modal>
				<Header callBack={this.headerCallBack}/>
				<TouchableOpacity style={styles.button} onPress={() => this.processPayment()}>
					<Text style={styles.buttonText}>Donate</Text>
				</TouchableOpacity>	
				<Text>Payment Status: {this.state.status}</Text>
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
	header: {
		backgroundColor: COLORS.NDA_BLUE,
        	height: HEIGHT * .20,
		flexDirection: 'column',
		marginBottom: HEIGHT * .12,
	},
	headerText: {
		margin: 10,
		fontSize: 60,
		textAlign: 'center',
		color: '#9a9a9a',
		borderWidth: 2,
		borderRadius: 4,
		borderColor: '#a5a5a5',
	},
	iconContainer: {
		zIndex: 2,
		width: 100,
	},
	menuIcon: {
		marginLeft: 10,
       },
	sideMenuStyle: {
		position: 'absolute',
		left: 0,
		margin: 0,
		width: WIDTH * 0.45,
		height: HEIGHT,
        	backgroundColor: COLORS.NDA_GREEN,
	},
	webview: {	
		position: 'absolute',
		bottom: 0,
		padding: 0,
		marginLeft: 0,
		width: WIDTH,
		height: HEIGHT * 0.76,
	},
	logoContainer: {
		zIndex: 1,
	},
	logo: {
		position: 'absolute',
        	width: WIDTH * .45,
        	left: WIDTH * .275,
        	height: WIDTH * .45,
        	top: -76,
        	zIndex: 1,
    	},
	text: {
		fontSize: 20,
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
		fontSize: 30,
		color: 'yellow',
	},
})
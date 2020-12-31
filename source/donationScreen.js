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
			<SafeAreaView style={styles.page}>
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
				<View style={styles.body}>
					<Text style={styles.text}>All donations will go towards .... We appreciate everything you do for this community!</Text>
					<Image
						style={styles.bodyImage}
						source={require('./images/pdfsplit/Booklet_7-7-1.png')}
						resizeMode={'contain'}
				 	/>
				</View>
				<View style={styles.footer}>
					<TouchableOpacity style={styles.button} onPress={() => this.processPayment()}>
						<Text style={styles.buttonText}>Donate</Text>
					</TouchableOpacity>	
					<Text style={styles.statusText}>Payment Status: {this.state.status}</Text>
				</View>
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
		height: HEIGHT,
		width: WIDTH,
		flexDirection: 'column',
	},
	body: {
		flex: 2,
		justifyContent: 'flex-end',
	},
	footer: {
		flex: 1,
		height: 200,
		backgroundColor: COLORS.NDA_BLUE,
	},
	webview: {	
		position: 'absolute',
		bottom: 0,
		padding: 0,
		marginLeft: 0,
		width: WIDTH,
		height: HEIGHT * 0.86,
	},
	bodyImage: {
		marginTop: 20,
		width: WIDTH,
		height: WIDTH * 0.5 + 60,
	},
	text: {
		fontSize: 18,
		paddingRight: 20,
		paddingLeft: 20,
	},
	button: {
		backgroundColor: COLORS.NDA_GREEN,
		padding: 20,
		marginBottom: 10,
		marginTop: 30,
		marginLeft: 40,
		marginRight: 40,
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 30,
		color: 'yellow',
	},
	statusText: {
		color: 'white',
		textAlign: 'center',
	},
})
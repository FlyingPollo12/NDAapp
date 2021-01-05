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
			totalRaised: "0.00",
		}
	}
	
	componentDidMount() {
		//call my api to get acct balance
		this.getTotalRaised();
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
						scalesPageToFit={true}
						scrollEnabled={false}
						cacheEnabled={false}
						style={styles.webview}
						ref={webView => (this.webView = webView)}
						source={{ uri: "https://slashsolutions.co/NDApaypal/" }}
						onNavigationStateChange={(data) => this.handleResponse(data)}
						injectedJavaScript={`document.paypal_form.submit()`}
						onLoadEnd={() => this.webView.postMessage(this.state.amount)}
					/>
				</Modal>
				<Header callBack={this.headerCallBack}/>
				<Image
					style={styles.backgroundImage}
					source={require('./Images/cross_image_adjusted.png')}
				/>
				<View style={styles.body}>
					<View style={styles.counterContainer}>
						<Text style={styles.counterText}>We have raised</Text>
						<Text style={styles.counterNumber}>${this.state.totalRaised}</Text>
					</View>
					{/*}<Image
						style={styles.bodyImage}
						source={require('./images/pdfsplit/Booklet_7-7-1.png')}
						resizeMode={'contain'}
				 	/>*/}
				</View>
				<View style={styles.footer}>
					<TouchableOpacity style={styles.button} onPress={() => this.processPayment()}>
						<Text style={styles.buttonText}>Donate</Text>
					</TouchableOpacity>	
					<Text style={styles.afterText}>All proceeds will go to funding for grants and for building maintence / improvement</Text>
				</View>
			</SafeAreaView>
		);
	}
	
	async getTotalRaised() {
		await fetch('https://slashsolutions.co/paypal/GetBalance.php')
		.then(resp => resp.json())
		.then(resp => {
			this.setState({ totalRaised: resp.amount });
		})
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
	backgroundImage: {
		position: 'absolute',
		top: HEIGHT * 0.15,
		left: 0,
		width: WIDTH,
		height: HEIGHT * 0.6,
		opacity: 0.7,
	},
	body: {
		marginTop: 50,
		flex: 2,
		justifyContent: 'flex-end',
	},
	menuIcon: {
		marginLeft: 10,
    },
    footer: {
		flex: 1,
		backgroundColor: COLORS.NDA_BLUE,
		justifyContent: 'center',
	},
	webview: {	
		position: 'absolute',
		bottom: 0,
		padding: 0,
		marginLeft: 0,
		width: WIDTH,
		height: HEIGHT * 0.9,
	},
	bodyImage: {
		marginTop: 20,
		width: WIDTH,
		height: WIDTH * 0.5 + 60,
	},
	text: {
		textAlign: 'center',
        fontFamily: 'Lora-Regular',
		fontSize: 18,
		paddingRight: 20,
		paddingLeft: 20,
	},
	counterContainer: {
		flexDirection: 'column',
		backgroundColor: 'rgba(52,52,52,0.5)',
	},
	counterText: {
		color: COLORS.NDA_GREEN,
		fontSize: 40,
		padding: 8,
		fontFamily: 'Graduate-Regular',
		textAlign: 'center',
	},
	counterNumber: {
		marginLeft: 20,
		marginRight: 20,
		padding: 0,
		color: 'black',
		textAlign: 'center',
		fontSize: 60,
		fontFamily: 'StardosStencil-Regular',
	},
	button: {
		backgroundColor: '#555555',
		padding: 25,
		borderRadius: 10,
		marginRight: WIDTH * 0.16,
		marginLeft: WIDTH * 0.16,
	},
	buttonText: {
        	fontFamily: 'Graduate-Regular',
		textAlign: 'center',
		fontSize: 45,
		color: 'yellow',
	},
	afterText: {
		paddingTop: 8,
		marginLeft: 40,
		marginRight: 40,
		textAlign: 'center',
		fontSize: 12,
		color: 'white',
	},
	statusText: {
        	fontFamily: 'Lora-Regular',
		color: 'white',
		textAlign: 'center',
	},
})
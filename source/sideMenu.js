import React, {Component} from 'react';
import { Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Alert,
} from 'react-native';

export default class sideMenu extends Component {
	constructor (props: Props) {
		super(props);
		this.state={
		}
	}
	
	parentFunction = (msg) => this.props.parentFunction(msg);
	
	render() {
		return(
			<View style={styles.page}>
				<View style={{height: 50}}></View>
				<TouchableOpacity style={styles.button} onPress={() => this.parentFunction("donationScreen")}>
					<Text style={styles.buttonText}>Donations</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => this.parentFunction("parentScreen")}>
					<Text style={styles.buttonText}>Parents</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => this.parentFunction("studentScreen")}>
					<Text style={styles.buttonText}>Students</Text>
				</TouchableOpacity>
                		<TouchableOpacity style={styles.button} onPress={() => this.parentFunction("alumniScreen")}>
					<Text style={styles.buttonText}>Alumni</Text>
				</TouchableOpacity>
			</View>
		);
	}
	
	toPage = () => {
		this.props.navigation.navigate("newPageScreen");
	}
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: '#666666',
	},
	button: {
		margin: 10,
		marginTop: 15,
		marginBottom: 15,
		padding: 10,
		borderWidth: 2,
		borderColor: '#ffffff',
		borderRadius: 4,
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 20,
	},
	text: {
		fontSize: 36,
		color: 'red',
	},
})
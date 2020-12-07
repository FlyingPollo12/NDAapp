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
	
	render() {
		return(
			<View style={styles.page}>
				<View style={{height: 50}}></View>
				<TouchableOpacity style={styles.button} onPress={() => Alert.alert("SIKE!")}>
					<Text style={styles.buttonText}>To new page</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Button</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Button</Text>
				</TouchableOpacity>
                		<TouchableOpacity style={styles.button} onPress = {()=> Alert.alert("I also hate jim! (but with different alert)")}  >
					<Text style={styles.buttonText}>MyNameIsJimAndIHateMerlock</Text>
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
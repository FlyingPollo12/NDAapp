import React, {Component} from 'react';
import { Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Alert,
    Image,
    Dimensions,
} from 'react-native';
import {COLORS} from './colors.js';     //Color Sheet

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;


//FOR MODAL USE
//needs parent function that can receive string msg for each option
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

                <Image
                    style={styles.emblem}
                    source={require('./images/NDA_LOGO_V_EMBLEM.png')}/>
                
                <View
                  style={{
                    borderBottomColor: COLORS.WHITE,
                    borderBottomWidth: 1,
                    width: '80%',
                    alignSelf: 'center',
                  }}
                />
                
				<View style={{height: 30}}></View>
				<TouchableOpacity style={styles.button} onPress={() => this.parentFunction("homeScreen")}>
					<Text style={styles.buttonText}>Home</Text>
				</TouchableOpacity>
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
				{/*------------ keep bottom ------------*/}
				<TouchableOpacity style={styles.button} onPress={() => this.parentFunction("goback")}>
					<Text style={styles.buttonText}>Back</Text>
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
		backgroundColor: COLORS.NDA_GREEN,
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
        color: COLORS.WHITE,
		fontSize: 20,
	},
	text: {
		fontSize: 36,
		color: COLORS.WHITE,
    },
    emblem: {
        justifyContent: 'center',
        alignSelf: 'center',
        resizeMode: 'contain',
        margin: 10,
        marginTop: 48,
        width: WIDTH * .25,
        height: WIDTH * .25,
    },
	
})
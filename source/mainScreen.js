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

export default class mainScreen extends Component {
	constructor(props: Props) {
		super(props);
		this.state = {
			isSideMenuVisible: false,
		}
	}
	
	render() {
		return 	(
            		<ScrollView>
             	   <SafeAreaView>
             	       {/*SideMenu*/}
             	       <Modal
             	           isVisible={this.state.isSideMenuVisible}
             	                   onBackdropPress={this.toggleSideMenu}
             	                   onSwipeComplete={this.toggleSideMenu}
             	                   animationIn="slideInLeft" 
             	                   animationOut="slideOutLeft" 
             	                   swipeDirection="left"
             	                   style={styles.sideMenuStyle} 
             	       >
             	           <SideMenu parentFunction={this.parentFunction}/>
             	       </Modal>
             	       {/*End Side Menu*/}
             	       
            			{/*Hamburger Button*/}
             	       <View style={styles.header}>
             	           <TouchableOpacity style={styles.fakeIcon} onPress={()=> this.toggleSideMenu()}></TouchableOpacity>
             	           <Text style={styles.headerText}>Menu</Text>
             	           <View style={{flex: 1}}></View>
             	       </View>
             	       {/*End Hamburger Button*/}
             	       
             		       {/*Logo & Text*/}
                   	 	<View style ={styles.logoContainer}>
                   	     		<Image
                   	      		   style={styles.logo}
                   	      		   source={require('./images/NDA_LOGO_V.png')}
                        		/>
                        		<Text style = {styles.text}>Give us your money, we will use it for the children. All of the children.</Text>
                    	</View>
                   		{/*End Logo*/}
                    </SafeAreaView>
            	</ScrollView>
		);
	}
	
	parentFunction = (msg) => {
		if (msg == "donationScreen")
			this.toggleSideMenu();
			this.props.navigation.navigate("donationScreen");
		}
	
	toggleSideMenu = () => {
		this.setState({ isSideMenuVisible: !this.state.isSideMenuVisible })
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLORS.GRAY,
		backgroundColor: '#333333',
		padding: 50,
		flexDirection: 'row',
	},
	headerText: {
		color: COLORS.WHITE,
		color: '#ffffff',
		fontSize: 42,
		textAlign: 'center',
		flex: 4,
	},
	fakeIcon: {
		flex: 1,
		backgroundColor: 'blue',
	},
	sideMenuStyle: {
		position: 'absolute',
		left: 0,
		margin: 0,
		width: WIDTH * 0.45,
		height: HEIGHT,
	},
    logo: {
        width: WIDTH * 1,
        height: HEIGHT * .55,
        paddingTop: 50,
        resizeMode: 'contain',
        height: HEIGHT * .515,
        paddingTop: 50,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: COLORS.NDA_BLUE,
        fontSize: 24,
        textAlign: 'center',
        paddingLeft: 50,
        paddingRight: 50,
    },
});
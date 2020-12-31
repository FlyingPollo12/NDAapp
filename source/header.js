import React, {Component} from 'react';
import { View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

import SideMenu from './sideMenu.js';
import { COLORS } from './colors.js';


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class Header extends Component {
	constructor(props: Props) {
		super(props);
		
		this.state = {
			title: this.props.title,
			menuVisible: false,
		}
	}
	
	callBack = (msg) => this.props.callBack(msg);
	
	
	render() {
		return (
			<View style={styles.header}>
				<Modal
                        		isVisible={this.state.menuVisible}
                                onBackdropPress={this.toggleSideMenu}
                                onSwipeComplete={this.toggleSideMenu}
                                animationIn="slideInLeft" 
                                animationOut="slideOutLeft" 
                                swipeDirection="left"
                                style={styles.sideMenuStyle}
                        	>
                        		<SideMenu parentFunction={this.parentFunction}/>
                    	</Modal>
                    	<View style={styles.iconContainer}>
                        	<Icon.Button iconStyle={styles.menuIcon}
                        		name="bars"
                          	size={50}
                         		color={COLORS.WHITE}
                           	backgroundColor={COLORS.NDA_BLUE}
                         		onPress={() => this.toggleSideMenu()}
                            />
                            </View>
                            <View style={styles.logoContainer}>
                    		<Image
                        			style={styles.logo}
                        			source={require('./images/circle_logo.png')}
                        		/>
                    	</View>
                    	{this.renderTitle()}
                    </View>
		)
	}
	
	
	renderTitle() {
		if (this.state.title != null) {
			return (
				<Text style={styles.headerText}>{this.state.title}</Text>
			);
		} else {
			return;
		}
	}
	
	
	toggleSideMenu = () => {
		this.setState({ menuVisible: !this.state.menuVisible });
	}
	
	
	parentFunction = (msg) => {
		if (msg == "donationScreen") {
			this.toggleSideMenu();
		}
		else if (msg == "parentScreen") {
			this.toggleSideMenu();
		}
		else if (msg == "studentScreen") {
			this.toggleSideMenu();
		}
		else if (msg == "alumniScreen") {
			this.toggleSideMenu();
		}
		else if (msg == "goback") {
			this.toggleSideMenu();
		}
		this.callBack(msg);
	}
}



const styles = StyleSheet.create({
	sideMenuStyle: {
		position: 'absolute',
		left: 0,
		margin: 0,
		width: WIDTH * 0.45,
		height: HEIGHT,
        	backgroundColor: COLORS.NDA_GREEN,
	},
	header: {
		backgroundColor: COLORS.NDA_BLUE,
        	height: HEIGHT * .15,
		flexDirection: 'column-reverse',
		marginBottom: HEIGHT * .12,
	},
	headerText: {
		margin: 5,
		fontSize: 55,
		textAlign: 'center',
		color: '#9a9a9a',
	},
	iconContainer: {
		zIndex: 2,
		width: 100,
	},
	menuIcon: {
		marginLeft: 10,
       },
	logoContainer: {
		zIndex: 1,
	},
	logo: {
		position: 'absolute',
        	width: WIDTH * .35,
        	left: WIDTH * .325,
        	height: WIDTH * .35,
        	top: 0,
        	zIndex: 1,
    	},
})
import React, {Component} from 'react';
import { Text,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';

import SideMenu from './sideMenu.js';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#333333',
		padding: 50,
		flexDirection: 'row',
	},
	headerText: {
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
        height: HEIGHT * .515,
        paddingTop: 50,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default class mainScreen extends Component {
	constructor(props: Props) {
		super(props);
		this.state = {
			isSideMenuVisible: false,
		}
	}
	
	render() {
		return 	(
			<SafeAreaView>
				<Modal
					isVisible={this.state.isSideMenuVisible}
            				onBackdropPress={this.toggleSideMenu}
            				onSwipeComplete={this.toggleSideMenu} 
            				animationIn="slideInLeft" 
            				animationOut="slideOutLeft" 
            				swipeDirection="left"
            				style={styles.sideMenuStyle} 
				>
					<SideMenu/>
				</Modal>
				<View style={styles.header}>
					<TouchableOpacity style={styles.fakeIcon} onPress={()=> this.toggleSideMenu()}></TouchableOpacity>
					<Text style={styles.headerText}>Menu</Text>
					<View style={{flex: 1}}></View>
				</View>
                
                <View style ={styles.logoContainer}>
                    <Image 
                        style={styles.logo}
                        source={require('./images/NDA_LOGO_V.png')}
                        />
                </View>
                
			</SafeAreaView>
		);
	}
	
	toggleSideMenu = () => {
		this.setState({ isSideMenuVisible: !this.state.isSideMenuVisible })
	}
}
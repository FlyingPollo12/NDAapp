import React, {Component} from 'react';
import { Text,
	View,
	SafeAreaView,
    ScrollView,
	Image,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
    ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from './colors.js';     //Color Sheet
import SideMenu from './sideMenu.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from './shared/Card.js';
import * as rssParser from 'react-native-rss-parser';
import _ from "lodash";



Icon.loadFont();

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default class mainScreen extends Component {
	constructor(props: Props) {
		super(props);
		this.state = {
			isSideMenuVisible: false,
            NDA_news: [],
            loading: true,
		}
	}
    
    componentDidMount(){
        this.fetchData();
    }
	
    fetchData() {
    console.log('...inFetch');

    fetch('https://www.notredameacademy.com/rss.cfm?news=0')
      .then(response => response.text())
      .then(responseData => rssParser.parse(responseData))
      .then(rss => {
      this.setState({ NDA_news: _.cloneDeep(rss.items), loading: false }, () => {
          if (console.log(this.state.NDA_news === rss.items)) {
            console.log('for this is a shallow copy');
          } else {
            console.log('for this is a deep copy');
          }
          console.log(this.state.NDA_news[0].title);
        });
      });
  }
    
	render() {
        console.log("inRender");
        if (this.state.loading) return <Text>Loading.....</Text>
        
		return 	(
            <ScrollView bounces={false}>
                <SafeAreaView>
                    {/*SideMenu*/}
                    <Modal
                        isVisible={this.state.isSideMenuVisible}
                                onBackdropPress={this.toggleSideMenu}
                                onSwipeComplete={this.toggleSideMenu}
                                animationIn="slideInLeft" 
                                animationOut="slideOutLeft" 
                                swipeDirection="left"
                                style={styles.sideMenuStyle}>
                        <SideMenu parentFunction={this.parentFunction}/>
                    </Modal>
                    {/*End Side Menu*/}
                    {/*Hamburger Button*/}
                    <View style={styles.header}>
                        <Icon.Button 
                            name="bars"
                            size={60} 
                            color={COLORS.WHITE}
                            backgroundColor={COLORS.NDA_BLUE}
                            onPress={()=> this.toggleSideMenu()} />
                    </View>
                    {/*End Hamburger Button*/}
                    {/*Logo & Text*/}
                    <Image
                        style={styles.logo}
                        source={require('./images/NDA_LOGO_V.png')}/>
                    <Text style = {styles.text}>
                        Give us your money, we will use it for the children. All of the children.</Text>
                    {/*End Logo*/}
                    {/*News Feed*/}
                    <View>
                        <View style={styles.hLine}/>
                        <Text style ={styles.newsText}>The Triton Times</Text>
                        <View style={styles.hLine}/>
                        <Card>
                            <Text>{this.state.NDA_news[0].title}</Text>
                            <Text>{this.state.NDA_news[0].description}</Text>
                        </Card>
                    </View>
                </SafeAreaView>
            </ScrollView>
		);
	}
	
	parentFunction = (msg) => {
		if (msg == "donationScreen") {
			this.toggleSideMenu();
			this.props.navigation.navigate("donationScreen");
		}
		else if (msg == "parentScreen") {
			this.toggleSideMenu();
			this.props.navigation.navigate("parentScreen");
		}
		else if (msg == "studentScreen") {
			this.toggleSideMenu();
			this.props.navigation.navigate("studentScreen");
		}
		else if (msg == "alumniScreen") {
			this.toggleSideMenu();
			this.props.navigation.navigate("alumniScreen");
		}
		else if (msg == "goback") {
			//do nothing but close side menu
			this.toggleSideMenu();
		}
	}
	
	toggleSideMenu = () => {
		this.setState({ isSideMenuVisible: !this.state.isSideMenuVisible })
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLORS.NDA_BLUE,
        	height: HEIGHT * .20,
		flexDirection: 'row',
       	alignItems: 'flex-end'
	},
	sideMenuStyle: {
		position: 'absolute',
		left: 0,
		margin: 0,
		width: WIDTH * 0.45,
		height: HEIGHT,
        backgroundColor: COLORS.NDA_GREEN,
	},
    logo: {
        width: WIDTH * .95,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignSelf: 'center',
        height: HEIGHT * .515,
    },
    text: {
        color: COLORS.NDA_BLUE,
        fontSize: 24,
        textAlign: 'center',
        paddingLeft: 50,
        paddingRight: 50,
    },
    newsText: {
        color: COLORS.WHITE,
        backgroundColor: COLORS.NDA_BLUE,
        fontSize: 50,
        textAlign: 'center',
        paddingLeft: 50,
        paddingRight: 50,
    },
    hLine: {
        borderBottomColor: COLORS.NDA_GREEN,
        borderBottomWidth: 5,
        width: WIDTH,
        alignSelf: 'center',
    },
});
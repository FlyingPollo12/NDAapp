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
    Flatlist,
    Linking,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from './colors.js';     //Color Sheet
import SideMenu from './sideMenu.js';
import Card from './shared/Card.js';
import Icon from 'react-native-vector-icons/FontAwesome';
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
          if (this.state.NDA_news === rss.items) {
            console.log('News: is a shallow copy');
          } else {
            console.log('News: is a deep copy');
          }
          console.log(rss.items[0].links[0].url);
          });
      });
  }
    
	render() {
        console.log("...inRender");
        if (this.state.loading) return <Text>Loading.....</Text>
		return 	(
            <ScrollView bounces={true}>
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
                        <View style={styles.iconContainer}>
                        <Icon.Button
                        		style={styles.icon}
                            	name="bars"
                            	size={60} 
                            	color={COLORS.WHITE}
                            	backgroundColor={COLORS.NDA_BLUE}
                            	onPress={()=> this.toggleSideMenu()} 
                        />
                        </View>
                    	<Image
                        		style={styles.logo}
                        		source={require('./images/NDA_LOGO_V.png')}
                        	/>
                    </View>
                    <Text style = {styles.text}>Give us your money, we will use it for the children. All of the children.</Text>
                    {/*End Hamburger Button*/}
                    
                    {/*News Feed*/}
                    <View>
                        <View style={styles.h_divider}/>
                        <Text style={styles.TTT_Text}>The Triton Times</Text>
                        <View style={styles.h_divider}/>
                        
                            <Card>
                                <Text style={styles.newsHeadline} >{this.state.NDA_news[0].title}</Text>
                                <Image
                                    style={styles.newsImage}
                                    source={{
                                        uri: this.state.NDA_news[0].enclosures[0].url,
                                        }}
                                    />
                                <Text style={styles.newsBody}>{this.state.NDA_news[0].description.trim()}</Text>
                                <Text style={{marginLeft: 15, fontSize: 16,}}>Read more:</Text>
                                <Text style={styles.newsLink} onPress={() => Linking.openURL(this.state.NDA_news[0].links[0].url)}>Source</Text>
                            </Card>
                        
                            <Card>
                                <Text style={styles.newsHeadline} >{this.state.NDA_news[1].title}</Text>
                                <Image
                                    style={styles.newsImage}
                                    source={{
                                        uri: this.state.NDA_news[1].enclosures[0].url,
                                        }}
                                    />
                                <Text style={styles.newsBody}>{this.state.NDA_news[1].description.trim()}</Text>
                                <Text style={{marginLeft: 15, fontSize: 16,}}>Read more:</Text>
                                <Text style={styles.newsLink} onPress={() => Linking.openURL(this.state.NDA_news[1].links[0].url)}>Source</Text>
                            </Card>
                        
                            <Card>
                                <Text style={styles.newsHeadline} >{this.state.NDA_news[2].title}</Text>
                                <Image
                                    style={styles.newsImage}
                                    source={{
                                        uri: this.state.NDA_news[2].enclosures[0].url,
                                        }}
                                    />
                                <Text style={styles.newsBody}>{this.state.NDA_news[2].description.trim()}</Text>
                                <Text style={{marginLeft: 15, fontSize: 16,}}>Read more:</Text>
                                <Text style={styles.newsLink} onPress={() => Linking.openURL(this.state.NDA_news[2].links[0].url)}>Source</Text>
                            </Card>
                        
                            <Card>
                                <Text style={styles.newsHeadline} >{this.state.NDA_news[3].title}</Text>
                                <Image
                                    style={styles.newsImage}
                                    source={{
                                        uri: this.state.NDA_news[3].enclosures[0].url,
                                        }}
                                    />
                                <Text style={styles.newsBody}>{this.state.NDA_news[3].description.trim()}</Text>
                                <Text style={{marginLeft: 15, fontSize: 16,}}>Read more:</Text>
                                <Text style={styles.newsLink} onPress={() => Linking.openURL(this.state.NDA_news[3].links[0].url)}>Source</Text>
                            </Card>
                        
                            <Card>
                                <Text style={styles.newsHeadline} >{this.state.NDA_news[4].title}</Text>
                                <Image
                                    style={styles.newsImage}
                                    source={{
                                        uri: this.state.NDA_news[4].enclosures[0].url,
                                        }}
                                    />
                                <Text style={styles.newsBody}>{this.state.NDA_news[4].description.trim()}</Text>
                                <Text style={{marginLeft: 15, fontSize: 16,}}>Read more:</Text>
                                <Text style={styles.newsLink} onPress={() => Linking.openURL(this.state.NDA_news[4].links[0].url)}>Source</Text>
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
       	alignItems: 'flex-end',
       	zIndex: 10,
       	marginBottom: HEIGHT * 0.32,
	},
	sideMenuStyle: {
		position: 'absolute',
		left: 0,
		margin: 0,
		width: WIDTH * 0.45,
		height: HEIGHT,
        	backgroundColor: COLORS.NDA_GREEN,
	},
	iconContainer: {
		zIndex: 2,
	},
	icon: {
		zIndex: 2,
	},
	logoContainer: {
		zIndex: 1,
	},
    	logo: {
    		zIndex: 1,
    		position: 'absolute',
    		top: 40,
    		left: 0,
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
        marginBottom: 10,
    },
     h_divider: {
        borderBottomColor: COLORS.NDA_GREEN,
        borderBottomWidth: 5,
        width: WIDTH,
        alignSelf: 'center',
    },
    TTT_Text: {
        color: COLORS.WHITE,
        backgroundColor: COLORS.NDA_BLUE,
        fontSize: 50,
        textAlign: 'center',
        paddingLeft: 50,
        paddingRight: 50,
    },
    newsHeadline:{
        fontSize: 24,
        textAlign:'left',
        paddingBottom: 15,
    },
    newsImage:{
        height: 256,
        width: 256,
        marginLeft: 15,
        marginBottom: 15,
    },
    newsBody:{
        includeFontPadding: false,
        textAlignVertical: 'center',
        fontSize: 16,
        textAlign: 'justify',
        marginLeft: 15,
        marginBottom: 15,
    },
    newsLink:{
        textDecorationLine: 'underline',
        color: COLORS.NDA_BLUE,
        marginLeft: 15,
    },
   
});
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
import Header from './header.js';

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
            		showNews: false,
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
            this.setState({ NDA_news: _.cloneDeep(rss.items), loading: false }, () => {});
          });
    }
    
	render() {
        	console.log("...inRender");
        	if (this.state.loading) return (null)
        
		return 	(
            <SafeAreaView>
            		<Header callBack={this.headerCallBack} />
            		<View style={{height: WIDTH * .2}}/>
            		<ScrollView>
                   		<Image style={styles.headerImage}
            				source={require('./Images/text_logo.png')}
            			/>
                    	<Text style = {styles.text}>Where faith and education come together in a Vibrant Growing Community</Text>
                    	{/*Give us your money, we will use it for the children. All of the children.*/}
                    	{/*End Hamburger Button*/}
  	                   {/*News Feed*/}
  	                   <View>
                        		<View style={styles.h_divider}/>
                        		<Text style={styles.TTT_Text}>The Triton Times</Text>
                        		{this.renderShowHide()}
                        		<View style={styles.h_divider}/>
                        	</View>
                        	{this.renderNews()}
                </ScrollView>
        </SafeAreaView>
	);
	}
	
	renderShowHide() {
		if (this.state.showNews) {
			return (
				<TouchableOpacity onPress={() => this.toggleNews()}>
					<Text style={styles.showhide}>HIDE</Text>
				</TouchableOpacity>
			)
		} else {
			return (
				<TouchableOpacity onPress={() => this.toggleNews()}>
					<Text style={styles.showhide}>SHOW</Text>
				</TouchableOpacity>
			)
		}
	}
	
	renderNews() {
		if (this.state.showNews) {
			return (
				<View>
				<Card>
					<Text style={styles.newsHeadline} >{this.state.NDA_news[0].title}</Text>
                            	<Image
                                	style={styles.newsImage}
                                	source={{ uri: this.state.NDA_news[0].enclosures[0].url,}}
                                />
                            	<Text style={styles.newsBody}>{this.state.NDA_news[0].description.trim()}</Text>
                            	<Text style={{marginLeft: 15, fontSize: 16, fontFamily: 'Spectral-Light',}}>Read more:</Text>
                            	<Text style={styles.newsLink} onPress={() => Linking.openURL(this.state.NDA_news[0].links[0].url)}>Source</Text>
                        	</Card>
                        	<Card>
                 			<Text style={styles.newsHeadline} >{this.state.NDA_news[1].title}</Text>
                        		<Image
                            		style={styles.newsImage}
                                	source={{ uri: this.state.NDA_news[1].enclosures[0].url,}}
                                />
                            	<Text style={styles.newsBody}>{this.state.NDA_news[1].description.trim()}</Text>
                            	<Text style={{marginLeft: 15, fontSize: 16, fontFamily: 'Spectral-Light',}}>Read more:</Text>
                            	<Text style={styles.newsLink} onPress={() => Linking.openURL(this.state.NDA_news[1].links[0].url)}>Source</Text>
                        	</Card>
                        	<Card>
                        		<Text style={styles.newsHeadline} >{this.state.NDA_news[2].title}</Text>
                            	<Image
                                	style={styles.newsImage}
                                	source={{uri: this.state.NDA_news[2].enclosures[0].url,}}
                                />
                            	<Text style={styles.newsBody}>{this.state.NDA_news[2].description.trim()}</Text>
                            	<Text style={{marginLeft: 15, fontSize: 16, fontFamily: 'Spectral-Light',}}>Read more:</Text>
                            	<Text style={styles.newsLink} onPress={() => Linking.openURL(this.state.NDA_news[2].links[0].url)}>Source</Text>
                        	</Card>
                        	<Card>
                         	  	<Text style={styles.newsHeadline} >{this.state.NDA_news[3].title}</Text>
                            	<Image
                                	style={styles.newsImage}
                                	source={{uri: this.state.NDA_news[3].enclosures[0].url,}}
                                />
                            	<Text style={styles.newsBody}>{this.state.NDA_news[3].description.trim()}</Text>
                            	<Text style={{marginLeft: 15, fontSize: 16, fontFamily: 'Spectral-Light',}}>Read more:</Text>
                            	<Text style={styles.newsLink} onPress={() => Linking.openURL(this.state.NDA_news[3].links[0].url)}>Source</Text>
                        	</Card>
                        	<Card>
                         	 	<Text style={styles.newsHeadline} >{this.state.NDA_news[4].title}</Text>
                            	<Image
                                	style={styles.newsImage}
                                	source={{uri: this.state.NDA_news[4].enclosures[0].url,}}
                                />
                            	<Text style={styles.newsBody}>{this.state.NDA_news[4].description.trim()}</Text>
                            	<Text style={{marginLeft: 15, fontSize: 16, fontFamily: 'Spectral-Light',}}>Read more:</Text>
                            	<Text style={styles.newsLink} onPress={() => Linking.openURL(this.state.NDA_news[4].links[0].url)}>Source</Text>
                        	</Card>
                    	</View>
			)
		} else {
			return (
				null
			)
		}
	}
	
	headerCallBack = (msg) => {
		if (msg == "donationScreen") {
			this.props.navigation.navigate("donationScreen");
		}
		else if (msg == "homeScreen") {
			//nothing to do... this IS the home screen :)
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
	
	toggleNews = () => {
		this.setState({ showNews: !this.state.showNews })
	}
	
	toggleSideMenu = () => {
		this.setState({ isSideMenuVisible: !this.state.isSideMenuVisible })
	}
}

const styles = StyleSheet.create({
	headerImage: {
		marginLeft: 10,
		marginRight: 10,
		resizeMode: 'stretch',
		width: WIDTH - 20,
		height: WIDTH * 0.4,
	},
	sideMenuStyle: {
		position: 'absolute',
		left: 0,
		margin: 0,
		width: WIDTH * 0.45,
		height: HEIGHT,
        	backgroundColor: COLORS.NDA_GREEN,
	},
    text: {
    	  marginTop: 14,
    	  marginBottom: 30,
        fontFamily: 'Lora-Regular',
        color: COLORS.NDA_BLUE,
        fontSize: 24,
        textAlign: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
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
        paddingTop: 14,
        paddingBottom: 14,
    },
    showhide: {
    	color: 'white',
    	backgroundColor: COLORS.NDA_OFF_BLUE,
    	fontSize: 20,
    	padding: 15,
    	textAlign: 'center',
    },
    newsHeadline:{
        fontFamily: 'CabinSketch-Regular',
        fontSize: 36,
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
        fontFamily: 'Spectral-Light',
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
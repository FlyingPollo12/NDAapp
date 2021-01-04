import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import { COLORS } from './colors.js'; //Color Sheet
import SideMenu from './sideMenu.js';
import { WebView } from 'react-native-webview';
import Header from './header.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class alumni extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      NDA_news: [],
      loading: true,
      showSAU: false,
      showRGA: false,
      showHOF: false,
    };
  }
    
  render() {
    return (
      <SafeAreaView style={styles.page}>
        <Header callBack={this.headerCallBack}/>
        <Text style={styles.alumTitle}>Alumni</Text>
        <View style={styles.h_divider}/>
        <View style={styles.taskBar}>
            <TouchableOpacity style={styles.taskBtn} onPress={() => this.toggleModal(1)}> 
                <Text style={styles.taskBtnTxt}>Share an Update</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.taskBtn} onPress={() => this.toggleModal(2)}> 
                <Text style={styles.taskBtnTxt}>Reunions and Gatherings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.taskBtn} onPress={() => this.toggleModal(3)}> 
                <Text style={styles.taskBtnTxt}>Hall of Fame</Text>
            </TouchableOpacity>
        </View>
            
              
        <ImageBackground
            source={require('./images/NDA_SchoolFront.png')}
            style={styles.bottomBanner} >
        </ImageBackground>
            
        <Modal
            style={styles.webView}
            isVisible= {this.state.showSAU}
            onRequestClose={() => this.setState({ showSAU: false })}
            onBackdropPress={() => this.setState({ showSAU: false })}>
            <Icon.Button
                name="times"
                size={50}
                color={COLORS.WHITE}
                backgroundColor={COLORS.NDA_BLUE}
                onPress={() => this.toggleModal(1)}>
            </Icon.Button>
            <WebView
                style={styles.webview}
                ref={webView => (this.webView = webView)}
                source={{ uri: "https://www.notredameacademy.com/alumni/send-an-update" }}>
            </WebView>    
        </Modal>
            
        <Modal
            style={styles.webView}
            isVisible= {this.state.showRGA}
            onRequestClose={() => this.setState({ showRGA: false })}
            onBackdropPress={() => this.setState({ showRGA: false })}>
            <Icon.Button
                name="times"
                size={50}
                color={COLORS.WHITE}
                backgroundColor={COLORS.NDA_BLUE}
                onPress={() => this.toggleModal(2)}>
            </Icon.Button>
            <WebView
                style={styles.webview}
                ref={webView => (this.webView = webView)}
                source={{ uri: "https://www.notredameacademy.com/alumni/reunions-gatherings" }}>
            </WebView>    
        </Modal>
            
        <Modal
            style={styles.webView}
            isVisible= {this.state.showHOF}
            onRequestClose={() => this.setState({ showHOF: false })}
            onBackdropPress={() => this.setState({ showHOF: false })}>
            <Icon.Button
                name="times"
                size={50}
                color={COLORS.WHITE}
                backgroundColor={COLORS.NDA_BLUE}
                onPress={() => this.toggleModal(3)}>
            </Icon.Button>
            <WebView
                style={styles.webview}
                ref={webView => (this.webView = webView)}
                source={{ uri: "https://www.notredameacademy.com/alumni/alumni-hall-of-fame" }}>
            </WebView>    
        </Modal>   
      </SafeAreaView>
    );
  }
    
    toggleModal(modalNo) {
        if (modalNo == 1)
            this.setState(prevState => ({ showSAU: !prevState.showSAU }));
        else if (modalNo == 2)
            this.setState(prevState => ({ showRGA: !prevState.showRGA }));
        else
             this.setState(prevState => ({ showHOF: !prevState.showHOF }));
    }
    
    headerCallBack(msg) {
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
}

const styles = StyleSheet.create({
    alumTitle: {
        alignSelf: 'center',
        marginLeft: 15,
        color: COLORS.NDA_BLUE,
        marginTop: HEIGHT * .10,
        fontSize: 64,
        fontFamily: 'Lora-Bold',
    },
    bottomBanner: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column-reverse',
        height: 400,
        width: '100%',
        resizeMode: 'contain',
        backgroundColor: 'transparent',
        zIndex: 0,
    },
    h_divider: {
        borderBottomColor: COLORS.NDA_BLUE,
        alignSelf: 'center',
        borderBottomWidth: 5,
        marginBottom: 30,
        width: WIDTH * .75,
    },
    page: {
        height: HEIGHT,
        width: WIDTH,
    },
    webView: {
        bottom: 0,
		padding: 0,
		marginLeft: 0,
        flexDirection: 'column',
        position: 'absolute',
		width: WIDTH,
		height: HEIGHT * .975,
    },
    taskBar: {
        zIndex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    taskBtn: {
        justifyContent: 'center',
        backgroundColor: COLORS.NDA_BLUE,
        elevation: 10,
        shadowColor: COLORS.BLACK,
        shadowOpacity: 1,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 12,
        padding: 20,
        marginBottom: 30,
    },
    taskBtnTxt: {
        fontSize: 24,
        fontFamily: 'Lora-Regular',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: COLORS.WHITE,  
    },
    
})
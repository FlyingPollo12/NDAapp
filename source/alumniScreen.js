import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import { COLORS } from './colors.js'; //Color Sheet
import SideMenu from './sideMenu.js';
import { WebView } from 'react-native-webview';
import Header from './header.js';

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
      <SafeAreaView>
        <Header callBack={this.headerCallBack}/>
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
            
        <Modal
            style={styles.webView}
            isVisible= {this.state.showSAU}
            onRequestClose={() => this.setState({ showSAU: false })}
            onBackdropPress={() => this.setState({ showSAU: false })}>
            <WebView
                style={styles.webview}
                ref={webView => (this.webView = webView)}
                source={{ uri: "https://www.notredameacademy.com/alumni/send-an-update" }}
                onNavigationStateChange={(data) => this.handleResponse(data)}>
            </WebView>    
        </Modal>
            
        <Modal
            style={styles.webView}
            isVisible= {this.state.showRGA}
            onRequestClose={() => this.setState({ showRGA: false })}
            onBackdropPress={() => this.setState({ showRGA: false })}>
            <WebView
                style={styles.webview}
                ref={webView => (this.webView = webView)}
                source={{ uri: "https://www.notredameacademy.com/alumni/reunions-gatherings" }}
                onNavigationStateChange={(data) => this.handleResponse(data)}>
            </WebView>    
        </Modal>
            
        <Modal
            style={styles.webView}
            isVisible= {this.state.showHOF}
            onRequestClose={() => this.setState({ showHOF: false })}
            onBackdropPress={() => this.setState({ showHOF: false })}>
            <WebView
                style={styles.webview}
                ref={webView => (this.webView = webView)}
                source={{ uri: "https://www.notredameacademy.com/alumni/alumni-hall-of-fame" }}
                onNavigationStateChange={(data) => this.handleResponse(data)}>
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
    
    headerCallBack = (msg) => {
		if (msg == "donationScreen") {
			this.props.navigation.navigate("donationScreen");
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
    webView: {
        bottom: 0,
		padding: 0,
		marginLeft: 0,
        flexDirection: 'column',
        position: 'absolute',
		width: WIDTH,
		height: HEIGHT * 0.85,
    },
    taskBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        flex: 1,
    },
    taskBtn: {
        justifyContent: 'center',
        backgroundColor: COLORS.NDA_BLUE,
        padding: 20,
    },
    taskBtnTxt: {
        fontFamily: 'Calibri',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: COLORS.WHITE,  
    },
})
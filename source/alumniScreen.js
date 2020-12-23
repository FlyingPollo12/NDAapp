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
import Card from './shared/Card.js';
import * as rssParser from 'react-native-rss-parser';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;


export default class alumni extends React.Component {
	constructor(props: Props) {
		super(props);
		this.state={
			amount: "0.00",
            NDA_news: []
		}
	}
    
    componentDidMount(){
        //console.log("Boy do i sure hate women and minorities");
        this.fetchData();
  }
    
    
    fetchData(){
        console.log("Yeet");
        fetch('https://www.notredameacademy.com/rss.cfm?news=0')
        .then(response => response.text())
        .then(responseData => rssParser.parse(responseData))
        .then((rss) => {
            rss.items.title.map((item) => {
                this.setState({ NDA_news: [...this.state.NDA_news,item,]})
            })
            {/*const copied_rss = [...rss.items];
            this.setState({ NDA_news : copied_rss });
                console.log(rss.items[0].title); */}
            }); 
    }
    
	render() {
        console.log("fucK IF THIS IS FIRST");
		return (
			<SafeAreaView>
                {/*Card Implementation Test*/}
                {/*  */}
                <Text>{this.state.NDA_news[0]}</Text>
                <Text>{this.state.NDA_news[1]}</Text>
                <Text>{this.state.NDA_news[2]}</Text>
            </SafeAreaView>
		);
	}
}
    
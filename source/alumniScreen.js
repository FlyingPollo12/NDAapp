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
import Card from './shared/Card.js';
import * as rssParser from 'react-native-rss-parser';
import _ from 'lodash';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class alumni extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      NDA_news: [],
      loading: true,
    };
  }
    
  render() {
    return (
      <SafeAreaView>
        <Text>No longer the worst thing Ian has ever worked on.</Text>
      </SafeAreaView>
    );
  }
}
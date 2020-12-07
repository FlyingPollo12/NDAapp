import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import main from './source/mainScreen.js';
import newPage from './source/newPage.js';



const Stack = createStackNavigator();

export default class App extends Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  };

	render() {
		return (
			<NavigationContainer>
    				<Stack.Navigator screenOptions={{headerShown: false}}>
    					<Stack.Screen name="mainScreen" component={main} />
    					<Stack.Screen name="newPageScreen" component={newPage} />
    				</Stack.Navigator>
  			</NavigationContainer>
		);
	}
}

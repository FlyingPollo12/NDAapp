import React, {Component} from 'react';
import { Text,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity,
} from 'react-native';




export default class mainScreen extends Component {
	constructor(props: Props) {
		super(props);
		this.state = {
		}
	}
	
	render() {
		return 	(
			<SafeAreaView>
				<Text>Hello World!</Text>
			</SafeAreaView>
		);
	}
}
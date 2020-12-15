import React, {Component} from 'react';
import {
	View,
	Text,
} from 'react-native';

export default class newPage extends Component {
	constructor(props: Props) {
		super(props);
		this.state={
			str: props.route.params.data,
		}
	}
	
	
	render() {
		return (
			<Text style={{fontSize: 40, color: 'red', textAlign: 'center'}}>{this.state.str}</Text>
		);
	}
}
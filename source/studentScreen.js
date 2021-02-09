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
import Pdf from 'react-native-pdf';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './header.js';
import CodeBook from './codeBook.js';



const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default class newPage extends Component {
	constructor(props: Props) {
		super(props);
		this.state={
			isCodeBookVisible: false,
			curPage: 0, //records curPage of lunchMenu ScrollView
			tableHead: ['Item', 'Price'],
			entrees: [],
			tableData: "",
			tableMonday: "",
			tableTuesday: "",
			tableWednesday: "",
			tableThursday: "",
			tableFriday: "",
		}
	}
	
	componentDidMount() {
		this.getMenu();
	}

	render() {
		return (
			<SafeAreaView style={styles.page}>
				<Modal
					style={styles.codeBookModal}
					isVisible= {this.state.isCodeBookVisible}
				>
					<CodeBook callBack={this.codeBookCallBack} />
				</Modal>
				<Header callBack={this.headerCallBack} />
				<View style={{height: 124}}/>
				<TouchableOpacity style={styles.button} onPress={() => this.toggleCodeBook()}>
					<Text style={styles.buttonText}>Code Book</Text>
				</TouchableOpacity>
				<ScrollView ref="menuScrollView" horizontal={true} scrollEnabled={false} style={styles.lunchMenu}>
					<View>
						<View style={{flexDirection: 'row', marginBottom: 2,}}>
							<Icon name="arrow-left" size={40} color={'black'} style={styles.menuButton} onPress={() => this.prevDay()}/>
							<Text style={styles.menuTitle}>Monday</Text>
							<Icon name="arrow-right" size={40} color={'black'} style={styles.menuButton} onPress={() => this.nextDay()}/>
						</View>
						<Text style={styles.menuEntree}>{this.state.entrees[0]}</Text>
						<Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          					<Row widthArr={[WIDTH*.66, WIDTH*.33]} data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
          					<Rows widthArr={[WIDTH*.66, WIDTH*.33]} data={this.state.tableMonday} textStyle={styles.text}/>
        				</Table>
    				</View>
    				<View>
						<View style={{flexDirection: 'row', marginBottom: 2,}}>
							<Icon name="arrow-left" size={40} color={'black'} style={styles.menuButton} onPress={() => this.prevDay()}/>
							<Text style={styles.menuTitle}>Tuesday</Text>
							<Icon name="arrow-right" size={40} color={'black'} style={styles.menuButton} onPress={() => this.nextDay()}/>
						</View>
						<Text style={styles.menuEntree}>{this.state.entrees[1]}</Text>
						<Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          					<Row widthArr={[WIDTH*.66, WIDTH*.33]} data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
          					<Rows widthArr={[WIDTH*.66, WIDTH*.33]} data={this.state.tableTuesday} textStyle={styles.text}/>
        				</Table>
    				</View>
    				<View>
						<View style={{flexDirection: 'row', marginBottom: 2,}}>
							<Icon name="arrow-left" size={40} color={'black'} style={styles.menuButton} onPress={() => this.prevDay()}/>
							<Text style={styles.menuTitle}>Wednesday</Text>
							<Icon name="arrow-right" size={40} color={'black'} style={styles.menuButton} onPress={() => this.nextDay()}/>
						</View>
						<Text style={styles.menuEntree}>{this.state.entrees[2]}</Text>
						<Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          					<Row widthArr={[WIDTH*.66, WIDTH*.33]} data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
          					<Rows widthArr={[WIDTH*.66, WIDTH*.33]} data={this.state.tableWednesday} textStyle={styles.text}/>
        				</Table>
    				</View>
    				<View>
						<View style={{flexDirection: 'row', marginBottom: 2,}}>
							<Icon name="arrow-left" size={40} color={'black'} style={styles.menuButton} onPress={() => this.prevDay()}/>
							<Text style={styles.menuTitle}>Thursday</Text>
							<Icon name="arrow-right" size={40} color={'black'} style={styles.menuButton} onPress={() => this.nextDay()}/>
						</View>
						<Text style={styles.menuEntree}>{this.state.entrees[3]}</Text>
						<Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          					<Row widthArr={[WIDTH*.66, WIDTH*.33]} data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
          					<Rows widthArr={[WIDTH*.66, WIDTH*.33]} data={this.state.tableThursday} textStyle={styles.text}/>
        				</Table>
    				</View>
    				<View>
						<View style={{flexDirection: 'row', marginBottom: 2,}}>
							<Icon name="arrow-left" size={40} color={'black'} style={styles.menuButton} onPress={() => this.prevDay()}/>
							<Text style={styles.menuTitle}>Friday</Text>
							<Icon name="arrow-right" size={40} color={'black'} style={styles.menuButton} onPress={() => this.nextDay()}/>
						</View>
						<Text style={styles.menuEntree}>{this.state.entrees[4]}</Text>
						<Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          					<Row widthArr={[WIDTH*.66, WIDTH*.33]} data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
          					<Rows widthArr={[WIDTH*.66, WIDTH*.33]} data={this.state.tableFriday} textStyle={styles.text}/>
        				</Table>
    				</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
	
	prevDay() {
		console.log("calling with : " + this.state.curPage);
		//this.setState({curPage: this.state.curPage - 1}, this.moveMenuScrollView());
		if (this.state.curPage > 0) {
			this.state.curPage = this.state.curPage - 1;
		}
		this.moveMenuScrollView();
	}
	
	nextDay() {
		console.log("calling with : " + this.state.curPage);
		//this.setState({curPage: this.state.curPage + 1}, this.moveMenuScrollView());
		if (this.state.curPage < 4) {
			this.state.curPage = this.state.curPage + 1;
		}
		this.moveMenuScrollView();
	}
	
	moveMenuScrollView() {
		console.log("now I have : " + this.state.curPage);
		this.refs.menuScrollView.scrollTo({
			x: (WIDTH * this.state.curPage) - this.state.curPage,
			y: 0,
			animated: true,
		})
	}
	
	printMenu = () => {
		console.log(this.state.tableMonday);
	}
	
	codeBookCallBack = (msg) => {
		if (msg == "close")
			this.toggleCodeBook();
	}
	
	headerCallBack = (msg) => {
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
	
	async getMenu() {
		firstTime = true; //only grab one null-priced item / day
		await fetch('https://slashsolutions.co/getMenu.php')
		.then(resp => resp.json())
		.then(resp => {
			//unfortunately the table component doesn't accept key value pair arrays!! This fixes that
			resp['Monday'].map(item => {
				tmp = [item.item, item.price];
				
				if (item.price == null && firstTime) {
					this.setState(prevState => ({
						entrees: [...prevState.entrees, item.item]
					}));
					firstTime = false;
				}
				else {
					this.setState(prevState => ({ 
						tableMonday: [...prevState.tableMonday, tmp]
					}));
				}
			})
			firstTime = true;
			
			resp['Tuesday'].map(item => {
				tmp = [item.item, item.price];
				
				if (item.price == null && firstTime) {
					this.setState(prevState => ({
						entrees: [...prevState.entrees, item.item]
					}));
					firstTime = false;
				}
				else {
					this.setState(prevState => ({ 
						tableTuesday: [...prevState.tableTuesday, tmp]
					}));
				}
			})
			firstTime = true;
			
			resp['Wednesday'].map(item => {
				tmp = [item.item, item.price];
				
				if (item.price == null && firstTime) {
					this.setState(prevState => ({
						entrees: [...prevState.entrees, item.item]
					}));
					firstTime = false;
				}
				else {
					this.setState(prevState => ({ 
						tableWednesday: [...prevState.tableWednesday, tmp]
					}));
				}
			})
			firstTime = true;
			
			resp['Thursday'].map(item => {
				tmp = [item.item, item.price];
				
				if (item.price == null && firstTime) {
					this.setState(prevState => ({
						entrees: [...prevState.entrees, item.item]
					}));
					firstTime = false;
				}
				else {
					this.setState(prevState => ({ 
						tableThursday: [...prevState.tableThursday, tmp]
					}));
				}
			})
			firstTime = true;
			
			resp['Friday'].map(item => {
				tmp = [item.item, item.price];
				
				if (item.price == null && firstTime) {
					this.setState(prevState => ({
						entrees: [...prevState.entrees, item.item]
					}));
					firstTime = false;
				}
				else {
					this.setState(prevState => ({ 
						tableFriday: [...prevState.tableFriday, tmp]
					}));
				}
			})
		})
	}
	
	toggleCodeBook = () => {
		this.setState({ isCodeBookVisible: !this.state.isCodeBookVisible });
	}
}


const styles = StyleSheet.create({
	page:{ 
	},
	codeBookModal: {
		margin: 0,
		width: WIDTH,
		height: HEIGHT,
	},
	button: {
		margin: 20,
		marginLeft: 40,
		marginRight: 40,
		padding: 20,
		backgroundColor: COLORS.NDA_BLUE,
	},
	buttonText: {
		fontSize: 34,
		textAlign: 'center',
		color: 'white',
	},
	lunchMenu: {
		margin: 5,
	},
	menuTitle: {
		flex: 3,
		textAlign: 'center',
		fontSize: 32,
		marginLeft: 8,
		padding: 10,
	},
	menuButton: {
		flex: 2,
		padding: 10,
		backgroundColor: '#dddddd',
		textAlign: 'center',
	},
	menuEntree: {
		marginTop: 16,
		marginBottom: 16,
		textAlign: 'center',
		width: WIDTH,
		fontSize: 20,
	},
	head: {
		backgroundColor: 'green',
	},
	text: {
		fontSize: 18,
		margin: 5,
	},
})
import React, {Component} from 'react';
import { View,
	Text,
	StyleSheet,
    Image,
    ImageBackground,
    SafeAreaView,
	Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from './colors.js';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class LoafingScreen extends Component {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View>
                <Image
                    style={styles.logo}
                    source={require('./images/NDA_LOGO_V.png')}
                />

                <Icon
                    style={styles.icon}
                    animate="spin"
                    name="cog"
                    size={60}
                    color={COLORS.NDA_GREEN}
                    backgroundColor={'transparent'}/>
                
                <ImageBackground
                    source={require('./images/NDA_SchoolFront.png')}
                    style={styles.bottomBanner} >
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: WIDTH * .025,
        width: WIDTH * .95,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignSelf: 'center',
        height: HEIGHT * .515,
    },
    icon: {
        zIndex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
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
});
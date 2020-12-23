import React from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
import {COLORS} from '../colors.js';     //Color Sheet

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        { props.children }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: COLORS.WHITE,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: COLORS.GRAY,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 12,
    marginVertical: 18,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  }
});
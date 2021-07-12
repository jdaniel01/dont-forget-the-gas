import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageView = () => {
    return (
        <View style={styles.container}>
            <Image styles={{ maxHeight = "500px" }} source={require('@expo/snack-static/react-native-logo.png')} />
        </View>
    )
}
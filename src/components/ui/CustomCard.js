import React from 'react';
import {View, Text} from 'react-native';

const CustomCard = (props) => {
    return (
        <View style={Object.assign(styles.containerStyle, props.style)}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        padding: 5,
    },
    title: {
        fontWeight: 'bold',
        color: '#15d1ef'
    }
};

export default CustomCard;
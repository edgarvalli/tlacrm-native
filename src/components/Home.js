import React from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { Icon, Card } from "react-native-elements";
import { HeaderContainer } from "./CustomComponents";

export default ({navigation, leads=0, jobs=0}) => (
    <View style={{ flex: 1 }}>        
        <HeaderContainer>
            <Icon name="menu" onPress={navigation.openDrawer} color="#0087B7" />
        </HeaderContainer>

        <View style={styles.container}>
            <Card containerStyle={styles.card}>
                <Text>Porspectos: { leads }</Text>
            </Card>
            <Card containerStyle={styles.card}>
                <Text>Trabajos: { jobs }</Text>
            </Card>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    card: {
        width: "70%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center"
    }
})
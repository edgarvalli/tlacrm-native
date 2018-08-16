import React from "react";
import {View, FlatList, ScrollView, StyleSheet, ActivityIndicator, RefreshControl} from "react-native";
import { List, Text } from "react-native-elements";
import ActionButton from 'react-native-action-button';
import call from "react-native-phone-call";
import { HeaderSearch, ListItem, Title } from "../CustomComponents";
import { color, request, api } from "../../init";

export default class ClientHome extends React.Component {

    state = {
        clients: [],
        page:1,
        loading: true,
        inTop: false,
        refresh: false
    }

    componentDidMount = () => this.fetchServer();

    async fetchServer(){
        const clients = await request.GET(api + "/clients/fetch/" + this.state.page);
        this.setState({loading: false, clients: clients.data});
    }

    scrollPosition(y) {
        let inTop;
        (y > 0 ) ? inTop = true : inTop = false;
        this.setState({inTop});
    }

    detailsItem = id => this.props.navigation.navigate("ClientForm", { action: "update", id })

    makePhoneCall = (number) => call({ number, prompt: false }).catch(console.error)

    listView() {
        return (
            <ScrollView onScroll={ev => this.scrollPosition(ev.nativeEvent.contentOffset.y)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refresh}
                        onRefresh={() => this.fetchServer()}/>
            }>
                
                <Title title="Clientes"/>

                <List containerStyle={{ marginBottom: 25, borderColor: "transparent" }}>
                    <FlatList 
                        data={this.state.clients}
                        keyExtractor={item => `${item.name}_${item._id}` }
                        renderItem={({item}) => (
                            <ListItem
                                title={item.name}
                                subtitle={item.cellphone}
                                icons={[
                                    {name:"phone", title:"Marcar", onPress: () => this.makePhoneCall(item.cellphone)},
                                    {name: "alert-circle", title:"Detalles", type:"feather", onPress: () => this.detailsItem(item._id)}
                                ]}
                            />
                        )}
                    />
                </List>
            </ScrollView>
        )
    }

    noItems = () => (
        <View style={styles.container}>
            <Text h4> No hay registros </Text>
        </View>
    )

    loadingView = () => (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={color.main}/>
        </View>
    )

    renderListView() {
        const { clients, loading } = this.state;
        if(loading) return this.loadingView();
        if(clients.length > 0) return this.listView();
        return this.noItems();
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "white"}}>
                <HeaderSearch
                    navigation={this.props.navigation}
                    showAnimation={this.state.inTop}
                    onChangeText={async data => {
                        if(data === "" ) {
                            this.fetchServer();
                        } else {
                            const clients = await request.GET(api + "/clients/search/" + data);
                            this.setState({clients: clients.data})
                        }
                    }}
                />
                {this.renderListView()}
                <ActionButton
                    buttonColor={color.main}
                    onPress={() => this.props.navigation.navigate("ClientForm", {
                        title: "Crear Client",
                        action: "create"
                    })}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    }
})
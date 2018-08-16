import React from "react";
import {View, FlatList, ScrollView, StyleSheet, ActivityIndicator, RefreshControl, Modal,
    TextInput, TouchableHighlight
} from "react-native";
import { Text, Icon, List } from "react-native-elements";
import ActionButton from "react-native-action-button";
import { HeaderContainer, ListItem, Title } from "../CustomComponents";
import { api, request, color } from "../../init";

export default class JobHome extends React.Component {

    state= {
        jobs: [],
        clients: [],
        page: 1,
        loading: true,
        inTop: false,
        refresh: false,
        showModal: false,
        focused: false
    }

    componentWillMount = () => this.fetchServer();

    async fetchServer() {
        const response = await request.GET(`${api}/jobs/fetch/${this.state.page}`);
        if(response.error) return alert(response.msg);
        this.setState({loading: false, jobs: response.data});
    }

    scrollPosition(y) {
        let inTop;
        (y > 0 ) ? inTop = true : inTop = false;
        this.setState({inTop});
    }


    listView() {
        return (
            <ScrollView onScroll={ev => this.scrollPosition(ev.nativeEvent.contentOffset.y)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refresh}
                        onRefresh={() => this.fetchServer()}/>
            }>
                
                <Title title="Trabajos Pendientes"/>

                <List containerStyle={{ marginBottom: 25, borderColor: "transparent" }}>
                    <FlatList 
                        data={this.state.jobs}
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
        const { jobs, loading } = this.state;
        if(loading) return this.loadingView();
        if(jobs.length > 0) return this.listView();
        return this.noItems();
    }

    async showModal() {
        const clients = await request.GET(`${api}/clients/fetch`);
        this.setState({showModal: true, clients});
    }

    render() {
        const { navigation } = this.props;
        const { focused, showModal, clients } = this.state;
        return(
            <View style={{flex: 1, backgroundColor: "white"}}>
                <HeaderContainer>
                    <Icon name="menu" onPress={navigation.openDrawer} color="#0087B7" />
                </HeaderContainer>

                {this.renderListView()}

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => this.setState({showModal: false})}>
                    
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:"rgba(0,0,0,0.3)"}}>

                        <View style={styles.modal}>
                            {
                                showModal &&
                                (
                                    <View style={{padding: 10}}>
                                        <View style={styles.header}>
                                            <View style={[styles.input, {borderColor: focused ? "#0087B7" :  "lightgrey"}]}>
                                                <Icon name="search" color={focused ? "#0087B7" :  "lightgrey"}/>
                                                <TextInput style={{ width: "80%", marginLeft: 5}}
                                                    onChangeText={async text => {
                                                        const clients = await request.GET(`${api}/clients/search/${text}`);
                                                        this.setState({clients});
                                                    }}
                                                    onFocus={() => this.setState({focused: true})}
                                                    onBlur={() => this.setState({focused: false})}
                                                    returnKeyType="search"
                                                    underlineColorAndroid ="transparent"
                                                />
                                            </View>
                                            <Text style={{color: "#0087B7"}}
                                                onPress={() => this.setState({showModal: false})}
                                            >Cerrar</Text>
                                        </View>
    
                                        <View>
                                            <List>
                                                <FlatList
                                                    data={clients}
                                                    keyExtractor={item => `${item.client_name}_${item.client_id}` }
                                                    renderItem={ ({item}) => (
                                                        <TouchableHighlight underlayColor="#eee"
                                                            onPress={() => {
                                                                alert(item.client_id)
                                                            }}
                                                        >
                                                            <View style={styles.listItem}>
                                                                <Text>{item.client_name}</Text>
                                                            </View>
                                                        </TouchableHighlight>
                                                    )}
                                                />
                                            </List>
                                        </View>
                                    </View>
                                )
                            }
                        </View>

                    </View>

                </Modal>
                
                <ActionButton
                    buttonColor={color.main}
                    onPress={() => this.showModal()}
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
    },
    modal: {
        width: "80%",
        height: "90%",
        backgroundColor: "white"
    },
    header:{
        width: "100%",
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    input: {
        width: "75%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 5,
        marginRight: "10%"
    },
    listItem: {
        width: "100%",
        alignItems: "center",
        justifyContent:"flex-start",
        height: 50,
        padding: 10,
        borderColor: "#eee",
        borderBottomWidth: 1
    }
})
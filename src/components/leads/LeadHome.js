import React from "react";
import { Text, List } from "react-native-elements";
import { View, ScrollView, ActivityIndicator, FlatList, Alert, StyleSheet, RefreshControl } from "react-native";
import ActionButton from 'react-native-action-button';
import call from "react-native-phone-call";
import { request, api, color } from "../../init";
import { HeaderSearch, ListItem, Dialog, Title } from "../CustomComponents";

export default class LeadHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            leads: [],
            page:1,
            loading: true,
            inTop: false,
            visible: false,
            refresh: false
        }
    }

    componentDidMount() {
        this.fetchServer();
    }

    async fetchServer(){
        const response = await request.GET(api + "/leads/fetch/" + this.state.page);
        if(response.error) return alert(response.msg);
        this.setState({loading: false, leads: response.data});
    }

    scrollPosition(y) {
        let inTop;
        (y > 0 ) ? inTop = true : inTop = false;
        this.setState({inTop});
    }

    removeItem(id) {
        Alert.alert(
            '¿Deseas eliminar el prospecto?',
            'Si da aceptar este proceso no sera reversible.',
            [
                {text: 'Cancelar', style: 'cancel'},
                {text: 'OK', onPress: async () => {
                    this.setState({visible: true});
                    const resp = await request.GET(`${api}/leads/remove/${id}`);
                    if(resp.error) return alert("Ocurrio un error al elminar el registro");
                    this.setState({visible: false})
                    this.fetchServer();
                }},
            ],
            { cancelable: false }
        )
    }

    detailsItem = (id) => this.props.navigation.navigate("LeadForm", {action: "update",id})

    makePhoneCall = (number) => call({ number, prompt: false }).catch(console.error)

    renderListItems() {
        const { leads } = this.state;
        if(leads.length === 0) {
            return (
                <View style={styles.container}>
                    <Text h4> No hay registros </Text>
                </View>
            )
        } else {
            return(

                <ScrollView onScroll={ev => this.scrollPosition(ev.nativeEvent.contentOffset.y)}
                    refreshControl={
                        <RefreshControl
                         refreshing={this.state.refresh}
                         onRefresh={() => this.fetchServer()}/>
                    }>

                    <Title title="Prospecto"/>

                    <List containerStyle={{ marginBottom: 25, borderColor: "transparent" }}>
                        <FlatList
                            data={leads}
                            keyExtractor={(item) => `${item.lead_name}_${item.lead_id}`}
                            renderItem={({item}) => 
                                <ListItem
                                    title={item.name}
                                    subtitle={item.cellphone}
                                    icons={[
                                        {name:"phone", title:"Marcar", onPress: () => this.makePhoneCall(item.cellphone)},
                                        {name: "alert-circle", title:"Detalles", type:"feather", onPress: () => this.detailsItem(item._id)},
                                        {name:"md-trash", title:"Eliminar", type:'ionicon', onPress: () => this.removeItem(item.lead)}
                                    ]}
                                />
                            }
                        />      
                    </List>
                </ScrollView>
                
            )
        }
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "white"}}>
                
                <HeaderSearch navigation={this.props.navigation}
                    showAnimation={this.state.inTop}
                    onChangeText={async data => {
                        if(data === "" ) {
                            this.fetchServer();
                        } else {
                            leads = await request.GET(api + "/leads/search/" + data);
                            this.setState({leads: leads.data})
                        }
                    }}
                />

                <Dialog loading text="Eliminando ..." show={this.state.visible}/>

                { this.state.loading ? (

                    <View style={styles.container}>
                        <ActivityIndicator size="large" color={color.main}/>
                    </View>

                ) : this.renderListItems() }

                <ActionButton
                    buttonColor={color.main}
                    onPress={() => this.props.navigation.navigate("LeadForm", {
                        title: "Crear Prospecto",
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
    },
    callBottom: {
        width: "100%",
        height: 50,
        padding: 10
    }
})
import React from "react";
import { View, KeyboardAvoidingView, ScrollView, Keyboard, StyleSheet } from "react-native";
import { FormInput, FormLabel, Button, CheckBox } from "react-native-elements";
import { color, request, api } from "../../init";
import { HeaderChild } from "../CustomComponents";

export default class LeadForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            values: {},
            marginBottom:0,
            title:"Crear Prospecto",
            inTop: false,
            inputs: [
                {
                    label: "Nombre",
                    id: "name",
                    type:"default"
                },
                {
                    label: "Cellphone",
                    id: "cellphone",
                    type:"numeric"
                },
                {
                    label: "Telefono",
                    id: "phone",
                    type:"numeric"
                },
                {
                    label: "Calle y numero",
                    id: "address",
                    type:"default"
                },
                {
                    label: "Colonia",
                    id: "hood",
                    type:"default"
                },
                {
                    label: "Municipio",
                    id: "county",
                    type:"default"
                },
                {
                    label: "Estado",
                    id: "state",
                    type:"default"
                }
            ]
        }
    }

    componentDidMount() {
        // Keyboard.addListener("keyboardDidShow", () => this.setState({marginBottom: "15%"}))
        // Keyboard.addListener("keyboardDidHide", () => this.setState({marginBottom: 0}))
        this.detectAction();
    }

    async detectAction() {
        const action = this.props.navigation.getParam("action", "create");
        if(action === "update") {
            const id = this.props.navigation.getParam("id", 1);
            const response = await request.GET(api + "/leads/getone/" + id);
            const values = response.data;
            this.setState({values, title:"Actualizar Prospecto"});
        }
    }

    async handleSubmit() {
        const action = this.props.navigation.getParam("action", "create");
        const { values } = this.state;

        if(values.name === "" && values.cellphone === "") {
            return alert("Debes de llenar el nombre y celular como minimo!!!")
        }

        if(action === "create") {
            values.user_id = 0;
            delete values._id;
            const response  =  await request.POST(api + "/leads/add", {data: values});
            (response.error) ? alert(response.msg) : this.props.navigation.goBack();
        } else {
            const response  =  await request.POST(api + "/leads/update", {data: values});
            (response.error) ? alert(response.msg) : this.props.navigation.goBack();
        }
    }

    handleChange(key, value){
        const { values } = this.state;
        values[key] = value;
        this.setState({values});
    }

    renderInputs() {
        const { inputs } = this.state;
        return inputs.map((el, i) => (
            <View key={el.label + "_" +el.id}>
                <FormLabel>{ el.label }</FormLabel>
                <FormInput ref={el.id}
                    onChangeText={val => this.handleChange(el.id, val)}
                    returnKeyType="next"
                    keyboardType={el.type}
                    underlineColorAndroid={color.main}
                    placeholder={el.label}
                    value={this.state.values[el.id]}
                    onSubmitEditing= { () => {
                        ((i+1) === inputs.length) ? this.refs.description.focus()
                            : this.refs[inputs[i + 1].id].focus()
                    }} />
            </View>
        ));
    }

    scrollPosition(y) {
        let inTop;
        (y > 0 ) ? inTop = true : inTop = false;
        this.setState({inTop});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <HeaderChild navigation={this.props.navigation}
                    title={this.state.title}
                    showAnimation = {this.state.inTop}
                />

                <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>

                    <ScrollView
                        onScroll={ev => this.scrollPosition(ev.nativeEvent.contentOffset.y)}
                        style={{marginBottom: this.state.marginBottom, backgroundColor:"white"}}
                    >
                        
                        
                        
                        { this.renderInputs() }

                        <View>
                            <FormLabel>Descripción</FormLabel>
                            <FormInput ref={"description"}
                                onChangeText={val => this.handleChange("description", val)}
                                returnKeyType="done"
                                keyboardType="default"
                                underlineColorAndroid={color.main}
                                placeholder={"Descriptción"}
                                value={this.state.values.description}
                                onSubmitEditing= { () => Keyboard.dismiss} />
                        </View>

                        {
                            (this.props.navigation.getParam("action", "create") === "update") && (
                                <CheckBox
                                    title="Visitado"
                                    checked={this.state.values.visited}
                                    containerStyle={{ backgroundColor: "transparent", borderColor: "transparent" }}
                                    onPress={() => {
                                        const { values } = this.state;
                                        values.visited = !this.state.values.visited;
                                        this.setState({values});
                                    }}
                                />
                            )
                        }

                        <Button
                            title="ENVIAR"
                            backgroundColor={color.main}
                            color="white"
                            containerViewStyle={{ marginBottom: 20, marginTop: 20 }}
                            iconRight={{ name: "send" }}
                            onPress={ () => this.handleSubmit() }
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    showButtonContainer: {
        position: "absolute",
        width:"50%",
        backgroundColor: "white",
        color: "black",
        right:2,
        top:-5,
        height:100,
        flexDirection:"column",
        zIndex: 100
    },
    hideButtonContainer: {
        width:0,
        height:0
    }
})
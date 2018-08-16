import React from "react";
import {
    View,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Animated,
    Modal,
    ActivityIndicator
} from "react-native";
import { Icon, Text } from "react-native-elements";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

export class HeaderContainer extends React.Component {

    state = {
        focused: false,
        borderBottom: false,
        borderBottomWidth: new Animated.Value(0),
        elevation: new Animated.Value(0)
    }
    
    componentWillReceiveProps(nextProp) {
        if(nextProp.showAnimation) {

            Animated.timing(this.state.borderBottomWidth, {
                toValue: 1,
                duration: 250
            }).start();

            Animated.timing(this.state.elevation, {
                toValue: 10,
                duration: 250
            }).start();

        } else {

            Animated.timing(this.state.borderBottomWidth, {
                toValue: 0,
                duration: 250
            }).start();

            Animated.timing(this.state.elevation, {
                toValue: 0,
                duration: 250
            }).start();

        }
        
    }

    render() {
        return (
            <Animated.View style={{
                height: StatusBar.currentHeight + 60,
                borderBottomColor: "#eeee",
                borderBottomWidth: this.state.borderBottomWidth,
                backgroundColor: "white",
                overflow: "scroll",
                elevation: this.state.elevation
            }}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style={styles.header}>
                    {this.props.children}
                </View>
    
            </Animated.View>
        )
    }

}

export class HeaderSearch extends React.Component {

    state = {
        focused: false,
        showAnimation: false
    }

    componentWillReceiveProps = (nextProp) => this.setState({showAnimation: nextProp.showAnimation}) 

    render() {
        const { navigation, onChangeText, onLayout } = this.props;
        const { focused, showAnimation } = this.state;
        return (
            <HeaderContainer showAnimation={showAnimation}>
                
                <Icon name="menu" onPress={navigation.openDrawer} color="#0087B7" />
                <View style={{
                    width: "75%",
                    height: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    borderWidth: 1,
                    borderRadius: 5,
                    marginRight: "10%",
                    borderColor: focused ? "#0087B7" :  "lightgrey"
                }}>
                    <Icon name="search" color={focused ? "#0087B7" :  "lightgrey"}/>
                    <TextInput style={{ width: "80%", marginLeft: 5}}
                        onChangeText={text => onChangeText(text)}
                        onFocus={() => this.setState({focused: true})}
                        onBlur={() => this.setState({focused: false})}
                        returnKeyType="search"
                        underlineColorAndroid ="transparent"
                    />
                </View>

            </HeaderContainer>
        )
    }

}

export const HeaderChild = props => (
    <HeaderContainer showAnimation={props.showAnimation}>
        <Icon name="arrow-back" color="#0087B7" onPress={() => props.navigation.goBack()}/>
        <View style={{width:"95%", justifyContent: "center", alignItems:"center"}}>
            <Text h4>{props.title}</Text>
        </View>
    </HeaderContainer>
)

export class Dialog extends React.Component{
    
    state={ show: this.props.show }

    componentWillReceiveProps = ({show}) => this.setState({show})

    loading() {
        return (
            <Modal
                visible={this.state.show}
                transparent={true}
                onRequestClose={() => console.log("Modal")}
            >  
                <View style={styles.modalContainer}>
                    <View style={styles.contentLoading}>
                        <Text style={styles.title} h4>Espere porfavor</Text>
                        <View style={styles.loading}>
                        <View style={styles.loader}>
                            <ActivityIndicator size="large" />
                        </View>
                        <View style={styles.loadingContent}>
                            <Text>{this.props.text}</Text>
                        </View> 
                    </View>
                </View>
                </View>
            </Modal>
        )
    }

    dialog() {
        return (
            <Modal
                visible={this.state.show}
                transparent={true}
                onRequestClose={() => console.log("Modal")}
            >  
               <View onPress={() => this.setState({show: false})}
                 style = {{
                    flex: this.state.show ? 1 : 0,
                    backgroundColor: 'rgba(0, 0, 0, .25)',
                    alignItems: 'center',
                    justifyContent: 'center',
                 }}               
               >
                    <View style={styles.content}>
                        {this.props.children}
                    </View>
                </View>
            </Modal>
        )
    }

    render() {
        if(this.props.dialog) {
            return this.dialog();
        } else {
            return this.loading();
        }
    }

}

export const IconWithTitle = ({name, type, title, onPress, style={}}) => (
    <TouchableHighlight
        onPress={onPress}
        underlayColor="#eeee"
        style={[{
            width: "25%",
            justifyContent: "center",
            alignItems: "center"
        }, style]}
    >
        <View>
            <Icon name={name} type={type}/>
            <Text>{title}</Text>
        </View>
    </TouchableHighlight>
)

export class ListItem extends React.Component {

    state = {
        expanded: false,
        initHeight: new Animated.Value(70)
    }

    collapsed() {
        Animated.timing(this.state.initHeight, {
            toValue: 70,
            duration: 250
        }).start();
        this.setState({expanded: false})
    }
    expanded() {
        Animated.timing(this.state.initHeight, {
            toValue: 145,
            duration: 250
        }).start();
        this.setState({expanded: true})
    }

    render() {
        const { title, subtitle,icons=[], hasPhone=false, cellphone, phone } = this.props;
        const { expanded } = this.state;
        return (
            <Animated.View style={{
                width: "100%",
                height: this.state.initHeight,
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                padding: 10 }}>

                <TouchableHighlight onPress={() => expanded ? this.collapsed() : this.expanded()}
                    underlayColor="#eeee"
                    style={{padding: 5, height: 60 }}>

                    <View>
                        <Text style={{ fontSize: 15 }}>{title}</Text>
                        <Text style={{ color: "grey" }}>{subtitle}</Text>
                    </View>
                    
                </TouchableHighlight>

                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    height: 80 }}>

                    { icons.map((props,i) => <IconWithTitle {...props} key={`${props.name}_${i}`}/>) }
                
                </View>
            </Animated.View>
        )
    }

}

export const Title = ({title}) => (
    <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
        <Text h4>{title}</Text>
    </View>
)

const styles = StyleSheet.create({
    headerContainer: {
        height: StatusBar.currentHeight + 60,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        backgroundColor: "white",
        overflow: "scroll"
    },
    header:{
        flex: 1,
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: StatusBar.currentHeight
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .25)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: 35,
        backgroundColor: 'white',
        width:"75%",
        height:"40%"
    },
    contentLoading:{
        padding: 35,
        backgroundColor: "white",
        width: "75%"
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    loading: {
        flexDirection: 'row',
        alignItems: 'center',
    },
      loader: {
        flex: 1,
    },
    loadingContent: {
        flex: 3,
        paddingHorizontal: 10,
    }
})
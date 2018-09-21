import React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { FormInput, FormLabel, FormValidationMessage, Card, Button } from 'react-native-elements';

export default class Login extends React.Component {

    state = {
        error: false
    }

    render() {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee'}}>
                
                <StatusBar hidden/>

                <Card containerStyle={styles.cardContainer}>
                    
                    <View style={styles.input}>
                        <FormLabel>Usuario</FormLabel>
                        <FormInput
                            shake={ this.state.error ? true :  false }
                            onBlur={() => this.setState({error: true})}
                        />
                    </View>

                    <View style={styles.input}>
                        <FormLabel>Contraseña</FormLabel>
                        <FormInput
                            textContentType='password'
                        />
                    </View>

                    { this.state.error && <FormValidationMessage>Usuario no encontrado</FormValidationMessage> }

                    <Button
                        icon={{name: 'vpn-key'}}
                        title='Login'
                    />
                </Card>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    cardContainer: {
        justifyContent: 'center',
        width: '80%',
        height: '60%',
        padding: 5
    },
    input:{
        width: '100%'
    }
})
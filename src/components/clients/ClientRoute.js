import { createStackNavigator } from "react-navigation";
import { color } from "../../init";

import ClientHome from "./ClientHome";
import ClientForm from "./ClientForm";

export default createStackNavigator({
    ClientHome: { screen: ClientHome, navigationOptions: { header: null } },
    ClientForm: { screen: ClientForm, navigationOptions: { header: null } }
},{
    navigationOptions: ({navigation}) => {
        return {
            headerTintColor: "white",
            headerStyle:{
                backgroundColor: color.main
            }
        }
    }
})
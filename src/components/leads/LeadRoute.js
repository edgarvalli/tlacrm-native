import { createStackNavigator } from "react-navigation";
import { color } from "../../init";

import LeadHome from "./LeadHome";
import LeadForm from "./LeadForm";

export default createStackNavigator({
    LeadHome: { screen: LeadHome, navigationOptions: { header: null } },
    LeadForm: { screen: LeadForm, navigationOptions: { header: null } }
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
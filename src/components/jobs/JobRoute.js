import { createStackNavigator } from "react-navigation";
import { color } from "../../init";

import JobHome from "./JobHome";

export default createStackNavigator({
    JobHome: { screen: JobHome, navigationOptions: { header: null } }
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
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import SignIn from "../pages/SignIn";
import SignOut from "../pages/SignOut";

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
    return (
        <Auth.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {backgroundColor: "#312E38"}
            }}
        >
            <Auth.Screen name="SignIn" component={SignIn} />
            <Auth.Screen name="SignOut" component={SignOut} />
        </Auth.Navigator>
    );
}

export default AuthRoutes;
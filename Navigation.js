import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from './contexts/AuthProvider';
import Home from './screens/home';
import Kendaraan from './screens/kendaraan';
import Landing from './screens/landing';
import Login from './screens/login';
import Register from './screens/register';
import ToDoForm from './screens/todo/form';
import ProfileUpdate from './screens/ProfileUpdate';
import MyQR from './screens/myqr';
import Location from './screens/location';
import Payment from './screens/payment';
import SlotParkir from './screens/SlotParkir';
import Notification from './screens/notification';
import History from './screens/history';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                {!user &&
                    <>
                        <Stack.Screen name="Landing" component={Landing} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                    </>}
                {user &&
                    <>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Payment" component={Payment} />
                        <Stack.Screen name="MyQR" component={MyQR} />
                        <Stack.Screen name="Location" component={Location} />
                        <Stack.Screen name="Kendaraan" component={Kendaraan} />
                        <Stack.Screen name="ToDoForm" component={ToDoForm} />
                        <Stack.Screen name="SlotParkir" component={SlotParkir} />
                        <Stack.Screen name="Notification" component={Notification} />
                        <Stack.Screen name="History" component={History} />
                        <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}
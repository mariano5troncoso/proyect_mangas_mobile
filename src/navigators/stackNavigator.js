import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler'
import Register from '../views/Register';
import SignIn from '../views/SignIn';
import Home from '../views/Home';
import Mangas from "../views/Mangas";
import MangaDetails from '../views/MangaDetails'
import ChapterCaps from "../components/ChapterCaps";
import ListComments from "../components/ListComments";
import Chapters from "../views/Chapters";

const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name= 'Home' component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name= 'Register' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name= 'SignIn' component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name= 'Mangas' component={Mangas} options={{ headerShown: false }} />
        <Stack.Screen name= 'MangaDetails' component={MangaDetails} options={{ headerShown: false }} />
        <Stack.Screen name= 'ChapterCaps' component={ChapterCaps} options={{ headerShown: false }} />
        <Stack.Screen name= 'ListComments' component={ListComments} options={{ headerShown: false }} />
        <Stack.Screen name= 'Chapters' component={Chapters} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default StackNavigator

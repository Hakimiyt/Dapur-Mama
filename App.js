import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { SourceSerifPro_600SemiBold, SourceSerifPro_700Bold } from '@expo-google-fonts/source-serif-pro';

import { RecipeProvider } from './src/context/RecipeContext';
import RecipeListScreen from './src/screens/RecipeListScreen';
import RecipeFormScreen from './src/screens/RecipeFormScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular, Inter_500Medium, Inter_600SemiBold,
    SourceSerifPro_600SemiBold, SourceSerifPro_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bgApp }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <RecipeProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bgApp } }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="RecipeList" component={RecipeListScreen} />
            <Stack.Screen name="RecipeForm" component={RecipeFormScreen} />
            <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </RecipeProvider>
    </SafeAreaProvider>
  );
}

import React from 'react';
import {StatusBar, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpense from './screens/AllExpenses';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GlobalStyles} from './constants/styles';
import IconButton from './components/UI/IconButton';

import ExpenseContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverView = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => (
          <IconButton
            icon="plus"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageExpenses');
            }}
          />
        ),
      })}>
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => (
            <Icon name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpense}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({color, size}) => (
            <Icon name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

function App(): any {
  return (
    <>
      <StatusBar />
      <ExpenseContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: 'white',
            }}>
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverView}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpense}
              options={{
                presentation: 'modal',
                title: 'Manage Expenses',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContextProvider>
    </>
  );
}

export default App;

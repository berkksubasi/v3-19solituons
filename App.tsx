import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import LabelScreen from './src/screens/LabelScreen';
import PriceScreen from './src/screens/PriceScreen';
import TransferScreen from './src/screens/TransferScreen';
import UpdatePriceScreen from './src/screens/UpdatePriceScreen';
import StockScreen from './src/screens/StockScreen';
import WarehouseScreen from './src/screens/WarehouseScreen';
import SalesScreen from './src/screens/SalesScreen';
import PurchasingScreen from './src/screens/PurchasingScreen';
import FinanceScreen from './src/screens/FinanceScreen';
import ProductionScreen from './src/screens/ProductionScreen';
import UserManagementScreen from './src/screens/UserManagementScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import { Provider as PaperProvider } from 'react-native-paper';

type RootStackParamList = {
  Login: undefined;
  Home: { role: string };
  InventoryScreen: undefined;
  PriceScreen: undefined;
  TransferScreen: undefined;
  UpdatePriceScreen: undefined;
  LabelScreen: undefined;
  StockScreen: undefined;
  WarehouseScreen: undefined;
  SalesScreen: undefined;
  PurchasingScreen: undefined;
  FinanceScreen: undefined;
  ProductionScreen: undefined;
  UserManagementScreen: undefined;
  ReportsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="InventoryScreen" component={InventoryScreen} />
          <Stack.Screen name="PriceScreen" component={PriceScreen} />
          <Stack.Screen name="TransferScreen" component={TransferScreen} />
          <Stack.Screen name="UpdatePriceScreen" component={UpdatePriceScreen} />
          <Stack.Screen name="LabelScreen" component={LabelScreen} />
          <Stack.Screen name="StockScreen" component={StockScreen} />
          <Stack.Screen name="WarehouseScreen" component={WarehouseScreen} />
          <Stack.Screen name="SalesScreen" component={SalesScreen} />
          <Stack.Screen name="PurchasingScreen" component={PurchasingScreen} />
          <Stack.Screen name="FinanceScreen" component={FinanceScreen} />
          <Stack.Screen name="ProductionScreen" component={ProductionScreen} />
          <Stack.Screen name="UserManagementScreen" component={UserManagementScreen} />
          <Stack.Screen name="ReportsScreen" component={ReportsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

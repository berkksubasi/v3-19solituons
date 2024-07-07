import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

const WarehouseHomeScreen: React.FC = () => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text>Depo Ana Sayfa</Text>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default WarehouseHomeScreen;

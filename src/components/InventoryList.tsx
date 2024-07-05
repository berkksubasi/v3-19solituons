
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchInventory } from '../api/inventory';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchInventory();
      setInventory(data);
    };

    getData();
  }, []);

  return (
    <View>
      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default InventoryList;

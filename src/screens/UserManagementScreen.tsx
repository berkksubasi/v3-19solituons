import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Provider as PaperProvider, Button, TextInput, Card, List, Dialog, Portal } from 'react-native-paper';
import { getUsers, addUser, updateUser, deleteUser } from '../api/users';

const UserManagementScreen: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [username, setUsername] = useState<string>('');
  const [role, setRole] = useState<string>('user');
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      Alert.alert('Hata', 'Kullanıcılar getirilemedi');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (username && role) {
      try {
        const newUser = await addUser({ username, role });
        setUsers(prevUsers => [...prevUsers, newUser]);
        setUsername('');
        setRole('user');
        Alert.alert('Başarılı', 'Kullanıcı eklendi');
      } catch (error) {
        Alert.alert('Hata', 'Kullanıcı eklenemedi');
      }
    } else {
      Alert.alert('Hata', 'Lütfen kullanıcı adı ve rolünü girin');
    }
  };

  const handleUpdateUser = async () => {
    if (selectedUser && username && role) {
      try {
        const updatedUser = await updateUser(selectedUser.id, { username, role });
        setUsers(prevUsers => prevUsers.map(user => (user.id === selectedUser.id ? updatedUser : user)));
        setSelectedUser(null);
        setUsername('');
        setRole('user');
        setDialogVisible(false);
        Alert.alert('Başarılı', 'Kullanıcı güncellendi');
      } catch (error) {
        Alert.alert('Hata', 'Kullanıcı güncellenemedi');
      }
    } else {
      Alert.alert('Hata', 'Lütfen kullanıcı adı ve rolünü girin');
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      Alert.alert('Başarılı', 'Kullanıcı silindi');
    } catch (error) {
      Alert.alert('Hata', 'Kullanıcı silinemedi');
    }
  };

  const showDialog = (user: any) => {
    setSelectedUser(user);
    setUsername(user.username);
    setRole(user.role);
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
    setSelectedUser(null);
    setUsername('');
    setRole('user');
  };

  return (
    <PaperProvider>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Kullanıcıyı Güncelle</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Kullanıcı Adı"
              value={username}
              onChangeText={text => setUsername(text)}
              style={styles.input}
            />
            <TextInput
              label="Rol"
              value={role}
              onChangeText={text => setRole(text)}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>İptal</Button>
            <Button onPress={handleUpdateUser}>Güncelle</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <TextInput
            label="Kullanıcı Adı"
            value={username}
            onChangeText={text => setUsername(text)}
            style={styles.input}
          />
          <TextInput
            label="Rol"
            value={role}
            onChangeText={text => setRole(text)}
            style={styles.input}
          />
          <Button mode="contained" style={styles.button} onPress={handleAddUser}>
            Kullanıcı Ekle
          </Button>
          <Card style={styles.card}>
            <Card.Title title="Kullanıcılar" />
            <Card.Content>
              {users.map((user, index) => (
                <List.Item
                  key={index}
                  title={user.username}
                  description={`Rol: ${user.role}`}
                  right={() => (
                    <View style={styles.actions}>
                      <Button onPress={() => showDialog(user)}>Güncelle</Button>
                      <Button onPress={() => handleDeleteUser(user.id)}>Sil</Button>
                    </View>
                  )}
                />
              ))}
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    width: '100%',
  },
  input: {
    marginVertical: 10,
    width: '100%',
  },
  button: {
    marginVertical: 10,
    paddingVertical: 10,
    width: '80%',
  },
  card: {
    width: '100%',
    marginVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default UserManagementScreen;

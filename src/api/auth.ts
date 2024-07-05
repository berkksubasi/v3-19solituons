// src/api/auth.ts

// Dummy users
const users = [
    { id: '1', username: 'store1', password: 'password1', role: 'store', name: 'Mağaza 1' },
    { id: '2', username: 'store2', password: 'password2', role: 'store', name: 'Mağaza 2' },
    { id: '3', username: 'store3', password: 'password3', role: 'store', name: 'Mağaza 3' },
    { id: '4', username: 'store4', password: 'password4', role: 'store', name: 'Mağaza 4' },
    { id: '5', username: 'store5', password: 'password5', role: 'store', name: 'Mağaza 5' },
    { id: '6', username: 'store6', password: 'password6', role: 'store', name: 'Mağaza 6' },
    { id: '7', username: 'warehouse1', password: 'password1', role: 'warehouse', name: 'Depo 1' },
    { id: '8', username: 'warehouse2', password: 'password2', role: 'warehouse', name: 'Depo 2' },
    { id: '9', username: 'admin', password: 'adminpass', role: 'admin', name: 'Genel Müdür' },
  ];
  
  // Giriş yapma fonksiyonu
  export const login = async (username: string, password: string) => {
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      return {
        success: true,
        user,
      };
    } else {
      throw new Error('Kullanıcı adı veya şifre hatalı');
    }
  };
  
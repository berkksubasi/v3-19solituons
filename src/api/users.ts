// src/api/users.ts

// Kullanıcıları listeleme
export const getUsers = async () => {
    // Burada gerçek API çağrısı yapılacak
    // return await api.get('/users');
    
    // Dummy data
    return [
      { id: '1', username: 'user1', role: 'admin' },
      { id: '2', username: 'user2', role: 'user' },
    ];
  };
  
  // Kullanıcı ekleme
  export const addUser = async (user: { username: string, role: string }) => {
    // Burada gerçek API çağrısı yapılacak
    // return await api.post('/users', user);
    
    // Dummy data
    return { id: '3', ...user };
  };
  
  // Kullanıcı güncelleme
  export const updateUser = async (id: string, user: { username: string, role: string }) => {
    // Burada gerçek API çağrısı yapılacak
    // return await api.put(`/users/${id}`, user);
    
    // Dummy data
    return { id, ...user };
  };
  
  // Kullanıcı silme
  export const deleteUser = async (id: string) => {
    // Burada gerçek API çağrısı yapılacak
    // return await api.delete(`/users/${id}`);
    
    // Dummy data
    return { id };
  };
  
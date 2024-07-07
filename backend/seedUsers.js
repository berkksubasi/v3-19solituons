const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedUsers = async () => {
  await mongoose.connect('mongodb://localhost:27017/nbmV3-19', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const users = [
    { username: 'Admin', password: '123admin', role: 'admin' },
    { username: 'Mağaza', password: '123mağaza', role: 'store' },
    { username: 'Depo', password: '123depo', role: 'warehouse' },
  ];

  await User.deleteMany({}); // Önceki kullanıcıları sil

  for (let userData of users) {
    const { username, password, role } = userData;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
  }

  console.log('Users seeded');
  mongoose.disconnect();
};

seedUsers();

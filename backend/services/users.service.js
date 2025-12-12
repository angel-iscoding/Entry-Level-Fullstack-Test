import db from '../models/index.js';
import bcrypt from 'bcrypt';

const { User } = db;

export const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error('Error fetching users from database:', error);
    throw error;
  }
};

export const create = async (userData) => {
  const userFound = await User.findOne({
    where: {
      email: userData.email
    }
  });

  if (userFound) {
    throw new Error('El usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
    active: true
  });

  return {
    message: 'Usuario creado',
    data: {
      id: newUser.id,
      email: newUser.email
    }
  };
};

export const update = async (userId, updates) => {
  const updatedUser = await User.update(updates, {
    where: { id: userId }
  });

  return {
    message: 'Usuario actualizado',
    data: {
      id: updatedUser.id,
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone
    }
  };
};

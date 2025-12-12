import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/index.js';

const { User } = db;

export const generateToken = (user) => {
  const payload = {
    userId: user.id,
    userEmail: user.email
  };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }

  // Sign token with expiration (e.g., 1 hour)
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });

  return token;
};

export const loginUser = async (userLogin) => {
  const userFound = await User.findOne({ where: { email: userLogin.email } });

  if (!userFound) {
    throw new Error('El usuario no existe');
  }

  console.log(bcrypt.hash(userLogin.password, userFound.password));

  const isMatch = await bcrypt.compare(userLogin.password, userFound.password);

  if (!isMatch) {
    throw new Error('Las contraseñas no coinciden');
  }

  const userToken = generateToken(userFound);

  return {
    message: 'Login exitoso!',
    token: userToken,
    data: {
      id: userFound.id,
      email: userFound.email
    }
  };
};

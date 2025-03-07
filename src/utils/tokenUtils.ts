import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export const generateToken = (userId:string) => {
 return jwt.sign({ userId }, SECRET, { expiresIn: '1h' });  // 1 hour expiry

}

export const verifyToken = (token:string) => {
 return jwt.verify(token, SECRET);
};

console.log(jwt);

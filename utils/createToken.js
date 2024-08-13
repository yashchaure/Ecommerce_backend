import jwt from 'jsonwebtoken';

const createToken = (res, userID) => {
    const token = jwt.sign({userID}, process.env.SECRETE_KEY, {expiresIn: '7d'});

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        maxAge: 3600000, // 1 hour
        sameSite: 'strict' // Strict same-site policy
    })

    return token;
}

export default createToken;
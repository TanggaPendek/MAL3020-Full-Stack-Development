import jwt from 'jsonwebtoken';

export default function(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authorization denies'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode.userId;
        next();
    } catch (error) {
        res.status(401).json({mesage: "Authorization not valid"});
    }
}
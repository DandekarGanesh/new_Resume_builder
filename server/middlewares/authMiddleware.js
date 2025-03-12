import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) => {
    try {

        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthenticated, Please log in'
            });
        }

        const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

        // console.log("userDetails :", userDetails);
        req.user = userDetails;

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("JWT Verification Error:", err);

        return res.status(401).json({
            success: false,
            message: 'Unauthenticated, (Please log in)'
        });
    }
};

export { isLoggedIn };

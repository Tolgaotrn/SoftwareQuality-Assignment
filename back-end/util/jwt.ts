import jwt from 'jsonwebtoken'

const generateJwtToken = ({ username, role }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'team_app' }

    try {
        return jwt.sign({ username, role }, process.env.JWT_SECRET, options)
    } catch (error) {
        console.log(error)
        throw new Error('Error generating JWT token, see server log for details.')
    }
};

export { generateJwtToken }

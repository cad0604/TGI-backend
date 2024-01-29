import jsonwebtoken from 'jsonwebtoken';
export class JwtUtils {
    static generate = async (payload, privateKey, options) => {
        return new Promise((resolve, reject) => {
            jsonwebtoken.sign(payload, privateKey, {
                ...options,
                algorithm: 'RS512',
                expiresIn: '4h',
            }, (error, encoded) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(encoded || ''); // Resolve an empty string if encoded is undefined
                }
            });
        });
    };
    static verify = async (jwtToken, publicKey, options) => {
        return new Promise((resolve, reject) => {
            jsonwebtoken.verify(jwtToken, publicKey, options, (error, decoded) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(decoded || {}); // Resolve an empty object if decoded is undefined
                }
            });
        });
    };
}

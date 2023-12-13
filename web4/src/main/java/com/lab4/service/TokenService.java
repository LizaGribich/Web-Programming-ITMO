package com.lab4.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import javax.ejb.Stateless;
import java.util.Date;

@Stateless
public class TokenService {

    private static final String ISSUER = "your-app";
    private static final String SECRET_KEY = "secret"; // В продакшене используйте более сложный ключ!

    public String createToken(String username) {
        Date expiryDate = new Date(System.currentTimeMillis() + 3600 * 1000); // 1 час

        return JWT.create()
                .withIssuer(ISSUER)
                .withClaim("username", username)
                .withExpiresAt(expiryDate)
                .sign(Algorithm.HMAC256(SECRET_KEY));
    }

    public boolean verifyToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(ISSUER)
                    .build();
            DecodedJWT jwt = verifier.verify(token);
            return true;
        } catch (JWTVerificationException exception) {
            return false;
        }
    }

    public String extractUserId(String token) {
        if (token == null) return null;
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(ISSUER)
                    .build();
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getClaim("username").asString();
        } catch (JWTVerificationException exception) {
            return null;
        }
    }
}


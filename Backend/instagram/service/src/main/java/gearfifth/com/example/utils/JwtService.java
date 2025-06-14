package gearfifth.com.example.utils;

import gearfifth.com.example.exceptions.InvalidTokenException;
import gearfifth.com.example.models.users.UserPrincipal;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;
    public static final long ACCESS_TOKEN_VALIDITY = 30 * 60 * 60 * 1000;
    private static final long REFRESH_TOKEN_VALIDITY = 7 * 24 * 60 * 60 * 1000;

    public String generateAccessToken(UserPrincipal userPrincipal){

        return generateToken(userPrincipal, ACCESS_TOKEN_VALIDITY);
    }

    public String generateRefreshToken(UserPrincipal userPrincipal) {

        return generateToken(userPrincipal, REFRESH_TOKEN_VALIDITY);
    }

    private String generateToken(UserPrincipal userPrincipal, long validity) {
        return Jwts.builder()
                .claims()
                .add(generateClaims(userPrincipal))
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + validity))
                .and()
                .signWith(getKey())
                .compact();
    }

    private Map<String, Object> generateClaims(UserPrincipal userPrincipal){
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", userPrincipal.getUsername());
        claims.put("role", userPrincipal.getAuthorities());
        claims.put("id", userPrincipal.getId());
        return claims;
    }


    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractBearerToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new InvalidTokenException("Invalid or missing Authorization header");
        }
        return authorizationHeader.substring(7);
    }
}
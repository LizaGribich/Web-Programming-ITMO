package com.lab4.service;

import com.lab4.models.User;
import org.mindrot.jbcrypt.BCrypt;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

@Stateless
public class UserService {

    @PersistenceContext
    private EntityManager entityManager;


    private boolean doesUsernameExist(String username) {
        Long count = entityManager.createQuery(
                        "SELECT COUNT(u) FROM User u WHERE u.username = :username", Long.class)
                .setParameter("username", username)
                .getSingleResult();
        return count > 0;
    }

    private boolean create(User user) {
        try {
            entityManager.persist(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    public boolean authenticate(String username, String password) {
        try {
            User user = findUserByUsername(username);
            if (user != null && BCrypt.checkpw(password, user.getPassword())) {
                return true;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }


    public boolean register(User user) {
        if (!doesUsernameExist(user.getUsername())) {
            return create(user);
        } else {
            return false;
        }
    }

    public User findUserByUsername(String username) {
        try {
            return entityManager.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class)
                    .setParameter("username", username)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public boolean validateCredentials(String username, String password) {
        return  !(password == null || password.length() < 4 || username == null || username.length() < 4 );
    }


}


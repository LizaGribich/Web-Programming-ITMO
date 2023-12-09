package com.lab4.dao;

import com.lab4.models.User;

import javax.annotation.Resource;
import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import javax.transaction.UserTransaction;

@ApplicationScoped
public class UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Resource
    private UserTransaction userTransaction;

    public UserDao() {
    }

    public User findUserByUsernameAndPassword(String username, String password) {
        TypedQuery<User> query = entityManager.createQuery(
                "SELECT u FROM User u WHERE u.username = :username AND u.password = :password", User.class);
        query.setParameter("username", username);
        query.setParameter("password", password);
        return query.getSingleResult();
    }

    public boolean doesUsernameExist(String username) {
        Long count = entityManager.createQuery(
                        "SELECT COUNT(u) FROM User u WHERE u.username = :username", Long.class)
                .setParameter("username", username)
                .getSingleResult();
        return count > 0;
    }


    public boolean create(User user) {
        try {
            userTransaction.begin();
            entityManager.persist(user);
            userTransaction.commit();
            return true;
        } catch (Exception e) {
            try {
                userTransaction.rollback();
            } catch (Exception rollbackException) {
            }
            return false;
        }
    }

}

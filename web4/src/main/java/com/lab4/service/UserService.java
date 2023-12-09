package com.lab4.service;

import com.lab4.dao.UserDao;
import com.lab4.models.User;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class UserService {

    @Inject
    private UserDao userDao;

    public UserService() {
    }

    public boolean authenticate(String username, String password) {
        try {
            User user = userDao.findUserByUsernameAndPassword(username, password);
            return user != null;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean register(User user) {
        if (!userDao.doesUsernameExist(user.getUsername())) {
            return userDao.create(user);
        } else {
            return false;
        }
    }


}


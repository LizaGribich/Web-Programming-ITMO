package com.lab4;


import com.lab4.controller.HitController;
import com.lab4.controller.UserController;
import com.lab4.filters.AuthFilter;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.Set;
import java.util.HashSet;

@ApplicationPath("/api")
public class MainApplication extends Application{
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<>();
        classes.add(UserController.class);
        classes.add(AuthFilter.class);
        classes.add(HitController.class);
        return classes;
    }
}

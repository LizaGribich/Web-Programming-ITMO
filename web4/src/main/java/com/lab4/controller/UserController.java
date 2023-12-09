package com.lab4.controller;

import com.lab4.service.UserService;
import com.lab4.models.User;


import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("auth")
public class UserController {

    @Inject
    private UserService userService;

    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(User user) {
        if (userService.authenticate(user.getUsername(), user.getPassword())) {
            System.out.println(user.getUsername());
            return Response.ok().entity("Login successful!").build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid credentials!").build();
        }
    }

    @POST
    @Path("register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response register(User user) {
        if (userService.register(user)) {
            return Response.status(Response.Status.CREATED).entity("User registered successfully!").build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Registration failed!").build();
        }
    }

}


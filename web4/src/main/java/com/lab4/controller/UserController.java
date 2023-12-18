package com.lab4.controller;

import com.lab4.service.TokenService;
import com.lab4.service.UserService;
import com.lab4.models.User;
import org.mindrot.jbcrypt.BCrypt;


import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("auth")
public class UserController {

    @Inject
    private UserService userService;

    private final TokenService tokenService = new TokenService();

    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(User user) {
        if (userService.authenticate(user.getUsername(), user.getPassword())) {
            String token = tokenService.createToken(user.getUsername());
            return Response.ok().entity(token).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid credentials!").build();
        }
    }

    @POST
    @Path("register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response register(User user) {
        if (!userService.validateCredentials(user.getUsername(), user.getPassword())) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Bad credentials!").build();
        }
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);

        if (userService.register(user)) {
            String token = tokenService.createToken(user.getUsername());
            return Response.status(Response.Status.CREATED).entity(token).build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Registration failed!").build();
        }
    }

}


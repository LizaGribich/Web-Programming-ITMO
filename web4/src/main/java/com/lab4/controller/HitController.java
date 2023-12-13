package com.lab4.controller;


import com.lab4.models.Hit;
import com.lab4.models.HitResult;
import com.lab4.models.User;
import com.lab4.service.HitResultService;
import com.lab4.service.TokenService;
import com.lab4.service.UserService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("hit")
public class HitController {

    @Inject
    private HitResultService hitResultService;

    @Inject
    private UserService userService;
    @Inject
    private TokenService tokenService;

    @POST
    @Path("do")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response doHit(@HeaderParam("Authorization") String authHeader, Hit hit) {

        String username = tokenService.extractUserId(authHeader);
        User user = userService.findUserByUsername(username);

        try {
            hit.isValid();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Bad request").build();
        }

        hit.checkPoint();

        HitResult hitResult = new HitResult();
        hitResult.setX(hit.getX());
        hitResult.setY(hit.getY());
        hitResult.setR(hit.getR());
        hitResult.setResult(hit.getResult());
        hitResult.setUser(user);

        hitResultService.saveHitResult(hitResult, user);
        return Response.ok().entity(hitResult).build();
    }

    @GET
    @Path("get")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllHits(@HeaderParam("Authorization") String authHeader) {
        String username = tokenService.extractUserId(authHeader);
        User user = userService.findUserByUsername(username);
        List<HitResult> hitResultList = hitResultService.getResultsByUser(user);
        return Response.ok().entity(hitResultList).build();
    }

    @POST
    @Path("clear")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response clearAllHits(@HeaderParam("Authorization") String authHeader) {
        String username = tokenService.extractUserId(authHeader);
        User user = userService.findUserByUsername(username);
        hitResultService.clearResultsByUser(user);
        return Response.ok().entity("Cleared").build();
    }

}
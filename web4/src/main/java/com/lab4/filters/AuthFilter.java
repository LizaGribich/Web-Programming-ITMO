
package com.lab4.filters;

import com.lab4.service.TokenService;

import javax.annotation.Priority;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Response;
import javax.ws.rs.Priorities;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.ext.Provider;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthFilter implements ContainerRequestFilter {

    private final TokenService tokenService = new TokenService();

    @Override
    public void filter(ContainerRequestContext requestContext) {
        UriInfo uriInfo = requestContext.getUriInfo();
        String path = uriInfo.getPath();

        if (path.endsWith("auth/login") || path.endsWith("auth/register")) {
            return;
        }

        String token = requestContext.getHeaderString("Authorization");
        if (token == null || !tokenService.verifyToken(token)) {
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
        }
    }
}
package com.lab4.service;

import com.lab4.models.HitResult;
import com.lab4.models.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class HitResultService {

    @PersistenceContext
    private EntityManager em;

    public void saveHitResult(HitResult hitResult, User user) {
        hitResult.setUser(user);
        em.persist(hitResult);
    }

    public List<HitResult> getResultsByUser(User user) {
        return em.createQuery("SELECT h FROM HitResult h WHERE h.user = :user ORDER BY h.id DESC", HitResult.class)
                .setParameter("user", user)
                .getResultList();
    }

    public void clearResultsByUser(User user) {
        em.createQuery("DELETE FROM HitResult h WHERE h.user = :user")
                .setParameter("user", user)
                .executeUpdate();
    }
}
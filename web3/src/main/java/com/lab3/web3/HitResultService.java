package com.lab3.web3;

import com.lab3.web3.models.HitResult;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class HitResultService {

    @PersistenceContext
    private EntityManager em;

    public void saveHitResult(HitResult hitResult) {
        em.persist(hitResult);
    }

    public List<HitResult> getAllResults() {
        return em.createQuery("SELECT h FROM HitResult h ORDER BY h.id DESC", HitResult.class).getResultList();
    }

    public void clearDatabase() {
        em.createQuery("DELETE FROM HitResult").executeUpdate();
    }
}
package com.lab3.web3;

import com.lab3.web3.models.Hit;
import com.lab3.web3.models.HitResult;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.inject.Inject;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


import org.omnifaces.cdi.Push;
import org.omnifaces.cdi.PushContext;

@ManagedBean
@SessionScoped
public class HitBean implements Serializable {
    private double x;
    private BigDecimal y;
    private float r;
    private List<HitResult> hits = new ArrayList<>();
    @EJB
    private HitResultService hitResultService;
    @Inject
    @Push(channel = "notify")
    private PushContext pushContext;

    public double getX() {
        return x;
    }

    public BigDecimal getY() {
        return y;
    }

    public float getR() {
        return r;
    }

    public List<HitResult> getHits() {
        return hits;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public void setR(float r) {
        this.r = r;
    }

    @PostConstruct
    public void init() {
        hits = hitResultService.getAllResults();
    }

    public void sendData() {
        pushContext.send("update");
    }

    public void checkHit() {
        Hit hit = new Hit(x, y, r);
        hit.isValid();
        hit.checkPoint();

        HitResult hitResult = new HitResult();
        hitResult.setX(x);
        hitResult.setY(y);
        hitResult.setR(r);
        hitResult.setResult(hit.getResult());
        try {
            hitResultService.saveHitResult(hitResult);
            hits.add(0, hitResult);
        } catch (OutOfMemoryError e) {
            hitResultService.clearDatabase();

            hitResultService.saveHitResult(hitResult);
            hits.add(0, hitResult);
        }
        sendData();

    }

    public void cleanDataBase() {
        hitResultService.clearDatabase();
        hits.clear();
        sendData();
    }
}

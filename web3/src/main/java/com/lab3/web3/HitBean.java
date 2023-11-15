package com.lab3.web3;

import com.lab3.web3.models.Hit;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@ManagedBean
@SessionScoped
public class HitBean implements Serializable {
    private double x;
    private BigDecimal y;
    private float r;
    private List<Hit> hits = new ArrayList<>();
    public double getX() {
        return x;
    }
    public BigDecimal getY() {
        return y;
    }
    public float getR() {
        return r;
    }

    public List<Hit> getHits() {return hits; }

    public void setX(double x) {
        this.x = x;
    }
    public void setY(BigDecimal y) {
        this.y = y;
    }
    public void setR(float r) {
        this.r = r;
    }

    public void checkHit() {
        Hit hit = new Hit(x, y, r);
        hit.isValid();
        hit.checkPoint();
        hits.add(0, hit);
    }
}

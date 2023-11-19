package com.lab3.web3.models;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "results")
public class HitResult implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double x;
    private BigDecimal y;
    private double r;
    private boolean result;

    public void setX(double x) {
        this.x = x;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public double getX() {
        return x;
    }

    public BigDecimal getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean getResult() {
        return result;
    }
}
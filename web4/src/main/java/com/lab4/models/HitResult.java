package com.lab4.models;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name = "results")
public class HitResult implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;
    private boolean result;
    private String currentTime;
    private double executionTime;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    public void setX(BigDecimal x) {
        this.x = x;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public void setR(BigDecimal r) {
        this.r = r;
    }

    public void setResult(boolean result) {
        this.result = result;
    }
    public void setCurrentTime(String currentTime) {
        this.currentTime = currentTime;
    }
    public void setExecutionTime(double executionTime) {
        this.executionTime = executionTime;
    }

    public BigDecimal getX() {
        return x;
    }

    public BigDecimal getY() {
        return y;
    }

    public BigDecimal getR() {
        return r;
    }

    public boolean getResult() {
        return result;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    public String getCurrentTime() {
        return currentTime;
    }

    public double getExecutionTime() {
        return executionTime;
    }
}

package com.lab4.models;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;

public class Hit {
    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;
    private boolean result;
    private String currentTime;
    private double executionTime;

    public Hit() {
    }

    public Hit(BigDecimal x, BigDecimal y, BigDecimal r) {
        this.x = x;
        this.y = y;
        this.r = r;
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

    public void setX(BigDecimal x) {
        this.x = x;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public void setR(BigDecimal r) {
        this.r = r;
    }
    public String getCurrentTime() {
        return currentTime;
    }

    public double getExecutionTime() {
        return executionTime;
    }

    public void setCurrentTime() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.currentTime = now.format(formatter);
    }
    public void setExecutionTime(double executionTime) {
        this.executionTime = executionTime;
    }

    public void checkPoint() {
        long startTime = System.nanoTime();

        BigDecimal xSquare = x.multiply(x);
        BigDecimal ySquare = y.multiply(y);
        BigDecimal halfR = r.divide(BigDecimal.valueOf(2));

        this.result =
                // треугольник в верхнем левом углу
                (x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(x.multiply(BigDecimal.valueOf(2)).add(r)) <= 0)
                        ||
                        // четверть круга в верхнем правом углу
                        (x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) <= 0 && (xSquare.add(ySquare).compareTo(halfR.pow(2)) <= 0))
                        ||
                        // прямоугольник в нижнем левом углу
                        (x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) <= 0 && x.compareTo(halfR.negate()) >= 0 && y.compareTo(r.negate()) >= 0);

        setCurrentTime();
        long endTime = System.nanoTime();
        this.executionTime = (endTime - startTime) / 1_000_000_000.0;
    }



    public void isValid() {

        if (x == null || y == null || r == null) {
            throw new IllegalArgumentException("Должны быть заданы x y r");
        } else if (y.compareTo(BigDecimal.valueOf(-5.0)) < 0 || y.compareTo(BigDecimal.valueOf(3.0)) > 0) {
            throw new IllegalArgumentException("Значение Y вне допустимого диапазона");
        } else if (x.compareTo(BigDecimal.valueOf(-3.0)) < 0 || x.compareTo(BigDecimal.valueOf(3.0)) > 0) {
            throw new IllegalArgumentException("Значение X недопустимо");
        } else if (r.compareTo(BigDecimal.valueOf(0)) <= 0 || r.compareTo(BigDecimal.valueOf(3)) > 0) {
            throw new IllegalArgumentException("Значение R недопустимо");
        }
    }

}
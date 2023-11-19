package com.lab3.web3.models;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;

public class Hit {
    private double x;
    private BigDecimal y;
    private float r;
    private boolean result;

    public Hit(double x, BigDecimal y, float r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public double getX() {
        return x;
    }

    public BigDecimal getY() {
        return y;
    }

    public float getR() {
        return r;
    }

    public boolean getResult() {
        return result;
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

    public void checkPoint() {

        BigDecimal xSquare = new BigDecimal(x).multiply(new BigDecimal(x));
        BigDecimal ySquare = y.multiply(y);
        BigDecimal rBigDecimal = BigDecimal.valueOf(r);
        BigDecimal rSquare = rBigDecimal.multiply(rBigDecimal);

        BigDecimal halfR = new BigDecimal(r).divide(new BigDecimal(2));

        this.result =
                // треугольник в верхнем левом углу
                (x <= 0 && y.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(rBigDecimal.add(BigDecimal.valueOf(x).multiply(new BigDecimal(2)))) <= 0)
                        ||
                        // четверть круга в верхнем правом углу
                        (x >= 0 && y.compareTo(BigDecimal.ZERO) >= 0 && (xSquare.add(ySquare).compareTo(halfR.pow(2)) <= 0))
                        ||
                        // квадрат в нижнем левом углу
                        (x <= 0 && y.compareTo(BigDecimal.ZERO) <= 0 && BigDecimal.valueOf(x).compareTo(rBigDecimal.negate()) >= 0 && y.compareTo(rBigDecimal.negate()) >= 0);

    }


    public void isValid() {
        ArrayList<Float> rValues = new ArrayList<>(Arrays.asList(1f, 1.25f, 1.5f, 1.75f, 2f, 2.25f, 2.5f, 2.75f, 3f,
                3.25f, 3.5f, 3.75f, 4f));
        if (y.compareTo(new BigDecimal("-5")) < 0 || y.compareTo(new BigDecimal("5")) > 0) {
            throw new IllegalArgumentException("Значение Y вне допустимого диапазона");
        } else if (x < -4 || x > 4) {
            throw new IllegalArgumentException("Значение X недопустимо");
        } else if (!rValues.contains(r)) {
            throw new IllegalArgumentException("Значение R недопустимо");
        }
    }
}

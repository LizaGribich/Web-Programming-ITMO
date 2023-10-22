package models;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;

public class Hit {
    private double x;
    private BigDecimal y;
    private float R;
    private boolean result;
    private String currentTime;
    private double executionTime;
    public Hit(double x, BigDecimal y, float R) {
        this.x = x;
        this.y = y;
        this.R = R;
    }

    public double getX() {
        return x;
    }
    public BigDecimal getY() {
        return y;
    }
    public float getR() {
        return R;
    }
    public boolean getResult() {
        return result;
    }
    public double getExecutionTime() {
        return executionTime;
    }
    public void checkPoint() {
        long startTime = System.nanoTime();
        BigDecimal xSquare = new BigDecimal(x).multiply(new BigDecimal(x));
        BigDecimal ySquare = y.multiply(y);
        BigDecimal rSquare = new BigDecimal(R).multiply(new BigDecimal(R));

        BigDecimal halfR = new BigDecimal(R).divide(new BigDecimal(2));

        this.result =
                (x <= 0 && y.compareTo(BigDecimal.ZERO) >= 0 && (xSquare.add(ySquare).compareTo(rSquare.multiply(new BigDecimal(0.25))) <= 0))
                        ||
                        (x <= 0 && y.compareTo(BigDecimal.ZERO) <= 0 && (new BigDecimal(x).compareTo(halfR.negate()) >= 0 && y.compareTo(new BigDecimal(-R)) >= 0))
                        ||
                        (x >= 0 && y.compareTo(BigDecimal.ZERO) <= 0 && (y.compareTo(new BigDecimal(x).subtract(new BigDecimal(R))) >= 0));


        setCurrentTime();
        long endTime = System.nanoTime();
        this.executionTime = (endTime - startTime) / 1_000_000_000.0;

    }
    public String getCurrentTime() {
        return currentTime;
    }
    public void setCurrentTime() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDate = now.format(formatter);
        this.currentTime = formattedDate;
    }
    public void isValid() {
        ArrayList<Float> rValues = new ArrayList<>(Arrays.asList(1f, 1.5f, 2f, 2.5f, 3f));
        if (y.compareTo(new BigDecimal("-3")) < 0 || y.compareTo(new BigDecimal("3")) > 0) {
            throw new IllegalArgumentException("Значение Y вне допустимого диапазона");
        } else if (x < -4 || x > 4) {
            throw new IllegalArgumentException("Значение X недопустимо");
        } else if (!rValues.contains(R)) {
            throw new IllegalArgumentException("Значение R недопустимо");
        }
    }
}

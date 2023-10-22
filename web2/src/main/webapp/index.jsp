<%@ page pageEncoding="UTF-8" %>
<%@ page import="models.Hit" %>
<%@ page import="java.util.List" %>
<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.math.BigDecimal" %>

<%!
    private String formatNumber(double number) {
        DecimalFormat df = new DecimalFormat("0.00000");
        String formatted = df.format(number).replace(',', '.');
        return formatted.replaceAll("\\.0*$", "").replaceAll("(\\.[0-9]*[1-9])0+$", "$1");
    }
%>
<%!
    private String formatBigNumber(BigDecimal number) {
        int scale = Math.min(5, number.scale());
        BigDecimal scaledNumber = number.setScale(scale, BigDecimal.ROUND_DOWN);
        return scaledNumber.stripTrailingZeros().toPlainString();
    }
%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Second lab</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
<div id="header">
    <img src="pictures/kitten.png"
         id="kittenImg"
         alt="Kitten">
    <section id="information">
        <strong>Грибич Елизавета Дмитриевна</strong>
        <br>
        <small>Группа: P3224<br>Вариант: 3402</small>
    </section>
</div>

<div id="main">
    <div class="big-text">
        Попробуй попасть в выделенную область!
    </div>
    <svg id="interactiveArea" width="350" height="350" style="border: 1px solid black;">
        <!-- Четверть круга в верхнем левом углу -->
        <path d="M 175 175 L 92.5 175 A 82.5 82.5 0 0 1 175 92.5 Z" fill="lightblue" />

        <!-- Прямоугольник в нижнем левом углу -->
        <rect x="92.5" y="175" width="82.5" height="165" fill="lightblue" />

        <!-- Треугольник в нижнем правом углу -->
        <polygon points="175,175 175,340 340,175" fill="lightblue" />

        <!-- Фоновая сетка и оси -->
        <line x1="175" y1="0" x2="175" y2="350" stroke="black" />
        <line x1="0" y1="175" x2="350" y2="175" stroke="black" />

        <!-- Засечки на оси X -->
        <line x1="10" y1="170" x2="10" y2="180" stroke="black" />
        <text id="x-negative-R" x="10" y="192" text-anchor="middle" font-size="9px">-R</text>

        <line x1="92.5" y1="170" x2="92.5" y2="180" stroke="black" />
        <text id="x-half-negative-R" x="92.5" y="192" text-anchor="middle" font-size="9px">-R/2</text>

        <line x1="257.5" y1="170" x2="257.5" y2="180" stroke="black" />
        <text id="x-half-R" x="257.5" y="192" text-anchor="middle" font-size="9px">R/2</text>

        <line x1="340" y1="170" x2="340" y2="180" stroke="black" />
        <text id="x-R" x="340" y="192" text-anchor="middle" font-size="9px">R</text>

        <!-- Засечки на оси Y -->
        <line x1="170" y1="10" x2="180" y2="10" stroke="black" />
        <text id="y-R" x="158" y="10" text-anchor="end" alignment-baseline="middle" font-size="9px">R</text>

        <line x1="170" y1="92.5" x2="180" y2="92.5" stroke="black" />
        <text id="y-half-R" x="158" y="92.5" text-anchor="end" alignment-baseline="middle" font-size="9px">R/2</text>

        <line x1="170" y1="257.5" x2="180" y2="257.5" stroke="black" />
        <text id="y-half-negative-R" x="158" y="257.5" text-anchor="end" alignment-baseline="middle" font-size="9px">-R/2</text>

        <line x1="170" y1="340" x2="180" y2="340" stroke="black" />
        <text id="y-negative-R" x="158" y="340" text-anchor="end" alignment-baseline="middle" font-size="9px">-R</text>

    </svg>


    <form>
        <p class="coordinate">Изменениe X</p>
        <input type="radio" id="radio1" name="X" value="-4">
        <label for="radio1">-4</label>
        <input type="radio" id="radio2" name="X" value="-3">
        <label for="radio2">-3</label>
        <input type="radio" id="radio3" name="X" value="-2">
        <label for="radio3">-2</label>
        <input type="radio" id="radio4" name="X" value="-1">
        <label for="radio4">-1</label>
        <input type="radio" id="radio5" name="X" value="0">
        <label for="radio5">0</label>
        <input type="radio" id="radio6" name="X" value="1">
        <label for="radio6">1</label>
        <input type="radio" id="radio7" name="X" value="2">
        <label for="radio7">2</label>
        <input type="radio" id="radio8" name="X" value="3">
        <label for="radio8">3</label>
        <input type="radio" id="radio9" name="X" value="4">
        <label for="radio9">4</label>

        <p class="coordinate">Изменениe Y</p>
        <input type="text" id="inputY" name="Y" placeholder="Значение от -3 до 3">

        <p class="coordinate">Изменениe R</p>
        <input type="radio" id="r1" name="R" value="1">
        <label for="radio1">1</label>
        <input type="radio" id="r2" name="R" value="1.5">
        <label for="radio2">1.5</label>
        <input type="radio" id="r3" name="R" value="2">
        <label for="radio3">2</label>
        <input type="radio" id="r4" name="R" value="2.5">
        <label for="radio4">2.5</label>
        <input type="radio" id="r5" name="R" value="3">
        <label for="radio5">3</label>

        <span id="errorMessage" class="message"></span>
        <span id="resultMessage" class="message"></span>

    </form>
    <div class="centered-button">
        <button class="big-text" id="checkButton">Нажми меня</button>
    </div>

    <div id="result-table-container" class="blured-container margin">
        <table id="result-table">
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Result</th>
                <th>Executed at</th>
                <th>Execution time, 10^-4 с</th>
            </tr>
            </thead>
            <tbody>
            <% List<Hit> hitHistory = (List<Hit>) session.getAttribute("results"); %>
            <% if (hitHistory != null) { %>
            <% for (int i = hitHistory.size() - 1; i >= 0; i--) { %>
                <% Hit hit = hitHistory.get(i); %>
                    <tr>
                        <td><%= formatNumber(hit.getX()) %></td>
                        <td><%= formatBigNumber(hit.getY()) %></td>
                        <td><%= formatNumber(hit.getR()) %></td>
                        <td><%= hit.getResult() %></td>
                        <td><%= hit.getCurrentTime() %></td>
                        <td><%= formatNumber(hit.getExecutionTime() * 10000) %></td>
                    </tr>
                <% } %>
            <% } %>
            </tbody>
        </table>
    </div>

</div>
<script src="./bundle.js"></script>
</body>
</html>

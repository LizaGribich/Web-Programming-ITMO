<%@ page import="models.Hit" %>
<%@ page import="java.util.List" %>
<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.math.BigDecimal" %>
<%@ page contentType="text/html;charset=UTF-8" %>

<%!
    private <T> String formatNumber(T number) {
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
<% List<Hit> hitHistory = (List<Hit>) session.getAttribute("results");
    Hit hit = hitHistory.get(hitHistory.size() - 1); %>
<html>
<head>
    <title>Results</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div id="results">Результат</div>
<svg id="interactiveArea" id="area" width="350" height="350" style="border: 1px solid black;">
    <!-- Четверть круга в верхнем левом углу -->
    <path d="M 175 175 L 92.5 175 A 82.5 82.5 0 0 1 175 92.5 Z" fill="lightblue"/>

    <!-- Прямоугольник в нижнем левом углу -->
    <rect x="92.5" y="175" width="82.5" height="165" fill="lightblue"/>

    <!-- Треугольник в нижнем правом углу -->
    <polygon points="175,175 175,340 340,175" fill="lightblue"/>

    <!-- Фоновая сетка и оси -->
    <line x1="175" y1="0" x2="175" y2="350" stroke="black"/>
    <line x1="0" y1="175" x2="350" y2="175" stroke="black"/>

    <!-- Засечки на оси X -->
    <line x1="10" y1="170" x2="10" y2="180" stroke="black"/>
    <text x="10" y="192" text-anchor="middle" font-size="9px">-<%= hit.getR() %></text>

    <line x1="92.5" y1="170" x2="92.5" y2="180" stroke="black"/>
    <text x="92.5" y="192" text-anchor="middle" font-size="9px">-<%= hit.getR()/2 %></text>

    <line x1="257.5" y1="170" x2="257.5" y2="180" stroke="black"/>
    <text x="257.5" y="192" text-anchor="middle" font-size="9px"><%= hit.getR()/2 %></text>

    <line x1="340" y1="170" x2="340" y2="180" stroke="black"/>
    <text x="340" y="192" text-anchor="middle" font-size="9px"><%= hit.getR() %></text>

    <!-- Засечки на оси Y -->
    <line x1="170" y1="10" x2="180" y2="10" stroke="black"/>
    <text x="158" y="10" text-anchor="end" alignment-baseline="middle" font-size="9px"><%= hit.getR() %></text>

    <line x1="170" y1="92.5" x2="180" y2="92.5" stroke="black"/>
    <text x="158" y="92.5" text-anchor="end" alignment-baseline="middle" font-size="9px"><%= hit.getR()/2 %></text>

    <line x1="170" y1="257.5" x2="180" y2="257.5" stroke="black"/>
    <text x="158" y="257.5" text-anchor="end" alignment-baseline="middle" font-size="9px">-<%= hit.getR()/2 %></text>

    <line x1="170" y1="340" x2="180" y2="340" stroke="black"/>
    <text x="158" y="340" text-anchor="end" alignment-baseline="middle" font-size="9px">-<%= hit.getR() %></text>

</svg>
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
        <% if (hitHistory != null) { %>
        <tr>
            <td><%= formatNumber(hit.getX()) %>
            </td>
            <td><%= formatBigNumber(hit.getY()) %>
            </td>
            <td><%= formatNumber(hit.getR()) %>
            </td>
            <td><%= hit.getResult() %>
            </td>
            <td><%= hit.getCurrentTime() %>
            </td>
            <td><%= formatNumber(hit.getExecutionTime() * 10000) %>
            </td>
        </tr>
        <% } %>
        </tbody>
    </table>
</div>
<div class="centered-button">
    <button class="big-text" onclick="goToIndex()">Назад</button>
</div>
<script>
    function goToIndex() {
        window.location.href = "index.jsp";
    }
</script>

<script>
    const SVG_SIZE = 350;
    const SVG_CENTER = SVG_SIZE / 2;
    let svg = document.getElementById('interactiveArea');
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const SCALE_COEFFICIENT = 2 * <%= hit.getR() %> / (SVG_SIZE - 20);
    let xPixel = <%= hit.getX() %> / SCALE_COEFFICIENT + SVG_CENTER;
    let yPixel = SVG_CENTER - <%= hit.getY() %> / SCALE_COEFFICIENT;

    circle.setAttribute("cx", xPixel);
    circle.setAttribute("cy", yPixel);

    circle.setAttribute("r", 3);
    circle.setAttribute("fill", <%= hit.getResult() %> ? "green" : "red");
    svg.appendChild(circle);
</script>
</body>
</html>

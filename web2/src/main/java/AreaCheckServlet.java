import com.google.gson.*;
import models.Hit;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.math.BigDecimal;


@WebServlet("/checkHit")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            double x = Double.parseDouble(request.getParameter("x"));
            BigDecimal y = new BigDecimal(request.getParameter("y"));
            float R = Float.parseFloat(request.getParameter("R"));
            Hit hit = new Hit(x,y,R);
            hit.isValid();
            hit.checkPoint();

            HttpSession session = request.getSession();
            List<Hit> results = (List<Hit>) session.getAttribute("results");
            if (results == null) {
                results = new ArrayList<>();
                session.setAttribute("results", results);
            }
            results.add(hit);
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();

            Gson gson = new GsonBuilder()
                    .registerTypeAdapter(BigDecimal.class, new JsonSerializer<BigDecimal>() {
                        @Override
                        public JsonElement serialize(BigDecimal src, Type typeOfSrc, JsonSerializationContext context) {
                            return new JsonPrimitive(src.toPlainString());
                        }
                    })
                    .create();

            String json = gson.toJson(hit);
            out.print(json);


            out.flush();
            out.close();
        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
        } catch (IllegalArgumentException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
        }

    }
}

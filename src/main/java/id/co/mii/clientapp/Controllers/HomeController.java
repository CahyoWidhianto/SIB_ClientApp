package id.co.mii.clientapp.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller // view -> html
public class HomeController {

  @GetMapping
  public String home(Model model) {
    model.addAttribute("name", "SIBKM");
    return "index";
  }
}

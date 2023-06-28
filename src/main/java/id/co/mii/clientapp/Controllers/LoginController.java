package id.co.mii.clientapp.Controllers;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import id.co.mii.clientapp.Models.dto.request.LoginRequest;
import id.co.mii.clientapp.Services.LoginService;
import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class LoginController {

    private LoginService loginService;

    @GetMapping("/login")
    public String loginPage(LoginRequest loginRequest){
//        model.addAttribute("loginRequest", new LoginRequest());
        return "auth/login";
    }

    @PostMapping("/login")
    public String login(LoginRequest loginRequest){
        if (!loginService.login(loginRequest)){
            return "redirect:/login?error=true";
        }
         String role = SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
            .map(Object::toString)
            .findFirst()
            .orElse("");

        if (role.contains("ADMIN")) {
            return "redirect:/country"; // Jika role adalah admin, redirect ke halaman county
        } else {
            return "redirect:/region"; // Jika role bukan admin, redirect ke halaman region
        }
    }

}

package id.co.mii.clientapp.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.mii.clientapp.Models.Role;
import id.co.mii.clientapp.Services.RoleService;
import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
@RequestMapping("/role")
public class RoleController {
    private RoleService roleService;

    @GetMapping
    public String getAll(Model model){
        model.addAttribute("roles", roleService.getAll());
        model.addAttribute("isActive", "role");
        return "role/index";
    }

    @GetMapping("/{id}")
    public String getById(@PathVariable Integer id, Model model){
        model.addAttribute("isActive", "role");
        model.addAttribute("role", roleService.getById(id));
        return "role/detail";
    }

    @GetMapping("/create")
    public String create(Role role, Model model){
        model.addAttribute("isActive", "role");
        return"role/create-form";
    }

    @PostMapping
    public String created(Role role){
        roleService.create(role);
        return "redirect:/role";
    }

    @GetMapping("/update/{id}")
    public String update(Model model, @PathVariable Integer id, Role role){
        model.addAttribute("isActive", "role");
        model.addAttribute("role", roleService.update(id, role));
        return "role/update-form";
    }

    @PutMapping("/{id}")
    public String updated(@PathVariable Integer id, Role role){
        roleService.update(id, role);
        return "redirect:/role";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id){
        roleService.delete(id);
        return "redirect:/role";
    }
    
}

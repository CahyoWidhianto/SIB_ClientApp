package id.co.mii.clientapp.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.mii.clientapp.Models.Employee;
import id.co.mii.clientapp.Services.EmployeeService;
import lombok.AllArgsConstructor;
@Controller
@AllArgsConstructor
@RequestMapping("/employee")
public class EmployeeController {
    
    private EmployeeService employeeService;

    @GetMapping
    public String getAll(Model model) {
        model.addAttribute("employees", employeeService.getAll());
        model.addAttribute("isActive", "employe");
        return "employee/index";
    }

    @GetMapping("/{id}")
    public String getById(@PathVariable Integer id, Model model) {
        model.addAttribute("isActive", "employee");
        model.addAttribute("region", employeeService.getById(id));
        return "employee/detail";
    }

    @GetMapping("/create")
    public String create(Employee employee, Model model) {
        model.addAttribute("isActive", "employee");
        return "employee/create-form";
    }

    @PostMapping
    public String created(Employee employee) {
        employeeService.create(employee);
        return "redirect:/employee";
    }

    @GetMapping("/update/{id}")
    public String update(Model model, @PathVariable Integer id, Employee employee) {
        model.addAttribute("isActive", "employee");
        model.addAttribute("employee", employeeService.getById(id));
        return "employee/update-form";
    }

    @PutMapping("/{id}")
    public String updated(@PathVariable Integer id, Employee employee) {
        employeeService.update(id, employee);
        return "redirect:/employee";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id) {
        employeeService.delete(id);
        return "redirect:/region";
    }

}

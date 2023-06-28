package id.co.mii.clientapp.Controllers.rest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.mii.clientapp.Models.Country;
import id.co.mii.clientapp.Models.User;
import id.co.mii.clientapp.Models.dto.request.UserRequest;
import id.co.mii.clientapp.Services.CountryService;
import id.co.mii.clientapp.Services.UserService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/user")
public class RestUserController {
    private UserService userService;

    @GetMapping
    public List<User> getCountryList() {
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Integer id){
        return userService.getById(id);
    }

    @PostMapping
    public UserRequest create(@RequestBody UserRequest userRequest){
        return userService.create(userRequest);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Integer id, @RequestBody User user){
        return userService.update(id, user);
    }

    @DeleteMapping("/{id}")
    public User delete(@PathVariable Integer id){
        return userService.delete(id);
    }
}
package id.co.mii.clientapp.Controllers;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.mii.clientapp.Models.Country;
import id.co.mii.clientapp.Services.CountryService;
import id.co.mii.clientapp.Services.RegionService;

@Controller
@AllArgsConstructor
@RequestMapping("/country")
public class CountryController {

  private CountryService countryService;
  private RegionService regionService;

  @GetMapping
  public String getAll(Model model) {
    model.addAttribute("isActive", "country");
    model.addAttribute("countries", countryService.getAll());
    return "country/index";
  }

  @GetMapping("/{id}")
  public String getById(@PathVariable Integer id, Model model) {
    model.addAttribute("isActive", "country");
    model.addAttribute("country", countryService.getById(id));
    return "country/detail";
  }

  @GetMapping("/create")
  public String create(Country country, Model model) {
    model.addAttribute("isActive", "country");
    model.addAttribute("regions", regionService.getAll());
    return "country/create-form";
  }

  @PostMapping
  public String created(Country country) {
    countryService.create(country);
    return "redirect:/country";
  }

  @DeleteMapping("/{id}")
  public String delete(@PathVariable Integer id) {
    countryService.delete(id);
    return "redirect:/country";
  }
  
  @GetMapping("/update/{id}")
  public String update(Model model, @PathVariable Integer id, Country country) {
    model.addAttribute("isActive", "country");
    model.addAttribute("country", countryService.getById(id));
    model.addAttribute("regions", regionService.getAll());

    return "country/update-form";
  }

  @PutMapping("/{id}")
  public String updated(@PathVariable Integer id, Country country) {
    countryService.update(id, country);
    return "redirect:/country";
  }

  
}
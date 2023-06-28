package id.co.mii.clientapp.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.mii.clientapp.Models.Country;

@Service
public class CountryService {
  
  @Value("${server.base.url}/country")
  private String url;

  @Autowired
  private RestTemplate restTemplate;

  public List<Country> getAll() {
    return restTemplate.exchange(
        url,
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<List<Country>>() {
        })
        .getBody();
  }

  public Country getById(Integer id) {
    return restTemplate.exchange(
        url.concat("/" + id),
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<Country>() {
        })
        .getBody();
  }

  public Country create(Country country) {
    HttpEntity<Country> httpEntity = new HttpEntity<Country>(country);
    return restTemplate
        .exchange(
            url,
            HttpMethod.POST,
            httpEntity,
            Country.class)
        .getBody();
  }

  public Country update(Integer id, Country country) {
    HttpEntity<Country> httpEntity = new HttpEntity<Country>(country);
    return restTemplate
        .exchange(
            url.concat("/" + id),
            HttpMethod.PUT,
            httpEntity,
            Country.class)
        .getBody();
  }
  public Country delete(Integer id) {
    return restTemplate.exchange(
        url.concat("/" + id),
        HttpMethod.DELETE,
        null,
        Country.class)
        .getBody();
  }
}

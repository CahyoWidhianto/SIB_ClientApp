package id.co.mii.clientapp.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import id.co.mii.clientapp.Models.Region;
import id.co.mii.clientapp.util.BasicHeader;

@Service
public class RegionService {

  @Value("${server.base.url}/region")
  private String url;

  @Autowired
  private RestTemplate restTemplate;

  public List<Region> getAll() {
    return restTemplate
      .exchange(
        url,
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<List<Region>>() {}
      )
      .getBody();
  }

  public Region getById(Integer id) {
    return restTemplate
      .exchange(
        url.concat("/" + id),
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<Region>() {}
      )
      .getBody();
  }

  public Region create(Region region) {
    HttpEntity<Region> httpEntity = new HttpEntity<Region>(region);
    return restTemplate
      .exchange(
        url,
        HttpMethod.POST,
        httpEntity,
        Region.class
      )
      .getBody();
  }

  public Region update(Integer id, Region region) {
    HttpEntity<Region> httpEntity = new HttpEntity<Region>(region);
    return restTemplate
      .exchange(
        url.concat("/" + id),
        HttpMethod.PUT,
        httpEntity,
        Region.class
      )
      .getBody();
  }

  public Region delete(Integer id) {
    return restTemplate
      .exchange(
        url.concat("/" + id),
        HttpMethod.DELETE,
        null,
        Region.class
      )
      .getBody();
  }
}

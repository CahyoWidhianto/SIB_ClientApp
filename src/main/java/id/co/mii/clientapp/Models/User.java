package id.co.mii.clientapp.Models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer id;
    private String username;
    private String password;
    private Boolean isEnabled;
    private Boolean isAccountNonLocked;
    private List<Role> roles;
}

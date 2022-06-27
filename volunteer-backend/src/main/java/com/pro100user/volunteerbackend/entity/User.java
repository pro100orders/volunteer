package com.pro100user.volunteerbackend.entity;

import com.pro100user.volunteerbackend.entity.enums.Role;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@Builder(toBuilder = true)
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "phone", nullable = false, unique = true)
    private String phone;

    @Column(name = "password", length = 64, nullable = false)
    private String password;

    @Column(name = "address")
    private String address;

    @Column(name = "description")
    private String description;

    @ElementCollection(fetch = FetchType.EAGER, targetClass = Role.class)
    @CollectionTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private List<Role> roles = new ArrayList<>();

    @Column(name = "enabled", nullable = false)
    private boolean enabled;


    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, targetEntity = Request.class)
    private List<Request> requests = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, targetEntity = Message.class)
    private List<Message> messages = new ArrayList<>();
}



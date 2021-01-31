package org.spring.boot.ecommerceapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
<<<<<<< HEAD
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="country")
=======

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "country", schema = "full-stack-ecommerce")
>>>>>>> dc774f86422e088e78fbfdacee54983602f38fa3
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< HEAD
    @Column(name="id")
    private int id;

    @Column(name="code")
    private String code;

    @Column(name="name")
    private String name;

    @OneToMany(mappedBy = "country")
    @JsonIgnore
    private List<State> states;

    public int getId() {
        return id;
    }

    public void setId(int id) {
=======
    @Column(name = "id")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "country")
    private Set<State> states;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
>>>>>>> dc774f86422e088e78fbfdacee54983602f38fa3
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

<<<<<<< HEAD
    public List<State> getStates() {
        return states;
    }

    public void setStates(List<State> states) {
        this.states = states;
    }
}










=======
    public Set<State> getStates() {
        return states;
    }

    public void setStates(Set<State> states) {
        this.states = states;
    }
}
>>>>>>> dc774f86422e088e78fbfdacee54983602f38fa3

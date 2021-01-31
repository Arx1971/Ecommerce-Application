package org.spring.boot.ecommerceapp.entity;

<<<<<<< HEAD
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="state")
=======
import javax.persistence.*;

@Entity
@Table(name = "state")
>>>>>>> dc774f86422e088e78fbfdacee54983602f38fa3
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< HEAD
    @Column(name="id")
    private int id;

    @Column(name="name")
    private String name;

    @ManyToOne
    @JoinColumn(name="country_id")
    private Country country;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
}












=======
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;

}
>>>>>>> dc774f86422e088e78fbfdacee54983602f38fa3

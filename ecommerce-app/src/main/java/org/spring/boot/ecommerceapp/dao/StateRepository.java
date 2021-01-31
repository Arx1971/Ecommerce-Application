package org.spring.boot.ecommerceapp.dao;

import org.spring.boot.ecommerceapp.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
<<<<<<< HEAD
=======

>>>>>>> dc774f86422e088e78fbfdacee54983602f38fa3
import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
<<<<<<< HEAD
public interface StateRepository extends JpaRepository<State, Integer> {
=======
public interface StateRepository extends JpaRepository<State, Long> {
>>>>>>> dc774f86422e088e78fbfdacee54983602f38fa3

    List<State> findByCountryCode(@Param("code") String code);

}

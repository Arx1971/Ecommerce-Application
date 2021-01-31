package org.spring.boot.ecommerceapp.dao;

<<<<<<< HEAD

=======
>>>>>>> dc774f86422e088e78fbfdacee54983602f38fa3
import org.spring.boot.ecommerceapp.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "countries", path = "countries")
<<<<<<< HEAD
public interface CountryRepository extends JpaRepository<Country, Integer> {
=======
public interface CountryRepository extends JpaRepository<Country, Long> {
>>>>>>> dc774f86422e088e78fbfdacee54983602f38fa3
}

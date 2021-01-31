package org.spring.boot.ecommerceapp.config;

import org.spring.boot.ecommerceapp.entity.Country;
import org.spring.boot.ecommerceapp.entity.Product;
import org.spring.boot.ecommerceapp.entity.ProductCategory;
import org.spring.boot.ecommerceapp.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] theUnSupportedActions = {HttpMethod.DELETE, HttpMethod.POST, HttpMethod.PUT};

        disableHttpMethod(Product.class, config, theUnSupportedActions);
        disableHttpMethod(ProductCategory.class, config, theUnSupportedActions);
        disableHttpMethod(State.class, config, theUnSupportedActions);
        disableHttpMethod(Country.class, config, theUnSupportedActions);

        exposeIds(config);

    }

    private void disableHttpMethod(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnSupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnSupportedActions))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnSupportedActions)));
    }

    public void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        List<Class> entityClasses = new ArrayList<>();

        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        Class[] domainTypes = entityClasses.toArray(new Class[0]);

        config.exposeIdsFor(domainTypes);
    }

}

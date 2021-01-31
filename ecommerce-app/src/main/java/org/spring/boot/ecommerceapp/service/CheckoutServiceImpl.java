package org.spring.boot.ecommerceapp.service;

import org.spring.boot.ecommerceapp.dao.CustomerRepository;
import org.spring.boot.ecommerceapp.dto.Purchase;
import org.spring.boot.ecommerceapp.dto.PurchaseResponse;
import org.spring.boot.ecommerceapp.entity.Customer;
import org.spring.boot.ecommerceapp.entity.Order;
import org.spring.boot.ecommerceapp.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        Order order = purchase.getOrder();

        String orderTrackingNumber = generateOrderTrackingNumber();

        order.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();
        customer.add(order);

        customerRepository.save(customer);

        return new PurchaseResponse(orderTrackingNumber);
    }

    public String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }

}

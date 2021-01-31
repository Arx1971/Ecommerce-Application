package org.spring.boot.ecommerceapp.service;

import org.spring.boot.ecommerceapp.dto.Purchase;
import org.spring.boot.ecommerceapp.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

}

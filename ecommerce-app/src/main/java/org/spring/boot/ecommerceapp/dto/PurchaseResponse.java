package org.spring.boot.ecommerceapp.dto;

public class PurchaseResponse {

    private String orderTrackNumber;

    public PurchaseResponse(String orderTrackNumber) {
        this.orderTrackNumber = orderTrackNumber;
    }

    public String getOrderTrackNumber() {
        return orderTrackNumber;
    }

    public void setOrderTrackNumber(String orderTrackNumber) {
        this.orderTrackNumber = orderTrackNumber;
    }
}

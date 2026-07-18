package com.jabbott.d288.services;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PurchaseResponse {

    private String orderTrackingNumber;

    public PurchaseResponse(String orderTrackingNumber) {
        this.orderTrackingNumber = orderTrackingNumber;
    }
}

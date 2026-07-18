package com.jabbott.d288.controllers;

import com.jabbott.d288.services.CheckoutService;
import com.jabbott.d288.services.Purchase;
import com.jabbott.d288.services.PurchaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    private final CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){

        if (purchase.getCart() == null || purchase.getCartItems() == null || purchase.getCartItems().isEmpty()) {
            System.out.println("Order failed, please enter a selection first!");
            return null;
        }
        return checkoutService.placeOrder(purchase);
    }
}
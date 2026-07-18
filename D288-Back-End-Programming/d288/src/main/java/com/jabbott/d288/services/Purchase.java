package com.jabbott.d288.services;

import com.jabbott.d288.entities.Cart;
import com.jabbott.d288.entities.CartItem;
import com.jabbott.d288.entities.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Purchase {
    private Customer customer;
    private Cart cart;
    private Set<CartItem> cartItems;
}

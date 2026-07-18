package com.jabbott.d288.services;

import com.jabbott.d288.dao.CartItemRepository;
import com.jabbott.d288.dao.CartRepository;
import com.jabbott.d288.dao.CustomerRepository;
import com.jabbott.d288.entities.Cart;
import com.jabbott.d288.entities.CartItem;
import com.jabbott.d288.entities.Customer;
import com.jabbott.d288.entities.Status;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private final CustomerRepository customerRepository;
    private final CartItemRepository cartItemsRepository;
    private final CartRepository cartsRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository,
                               CartItemRepository cartItemsRepository,
                               CartRepository cartsRepository
    ) {

        this.customerRepository = customerRepository;
        this.cartItemsRepository = cartItemsRepository;
        this.cartsRepository = cartsRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Cart carts = purchase.getCart();

        // Generate and assign tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        carts.setOrderTrackingNumber(orderTrackingNumber);

        // Set status type properly
        carts.setStatus(Status.ordered);

        // Add each cart item using the correct method
        Set<CartItem> cartItems = purchase.getCartItems();
        cartItems.forEach(carts::addCartItems);

        // Set the customer on the cart
        Customer customer = purchase.getCustomer();
        carts.setCustomer(customer); // IMPORTANT

        // Save the cart directly to verify tracking number saves correctly
        cartsRepository.save(carts);

        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();

    }
}
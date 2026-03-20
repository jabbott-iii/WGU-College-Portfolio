package com.example.demo.controllers;

import com.example.demo.domain.Product;
import com.example.demo.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.Optional;


@Controller
public class BuyProduct {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/buyProduct")
    public String buyProduct(@RequestParam("productID") long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            if (product.get().getInv() > 0) {
                product.get().setInv(product.get().getInv() - 1);
                productRepository.save(product.get());
                return "buysuccess";
            } else {
                return "buyerror";
            }
        } else {
            return "buyerror";
        }
    }
}

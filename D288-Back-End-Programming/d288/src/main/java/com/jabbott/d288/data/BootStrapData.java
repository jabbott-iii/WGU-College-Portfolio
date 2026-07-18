package com.jabbott.d288.data;

import com.jabbott.d288.dao.CustomerRepository;
import com.jabbott.d288.dao.DivisionRepository;
import com.jabbott.d288.entities.Customer;
import com.jabbott.d288.entities.Division;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class BootStrapData implements CommandLineRunner {

    private final CustomerRepository customerRepository;
    private final DivisionRepository divisionRepository;

    public BootStrapData(CustomerRepository customerRepository, DivisionRepository divisionRepository) {
        this.customerRepository = customerRepository;
        this.divisionRepository = divisionRepository;
    }

    @Override
    public void run(String... args) {
        // Skip adding customers if more than 5 exist
        if (customerRepository.count() >= 5) {
            System.out.println("Sample customers already added. Skipping initialization.");
            return;
        }

        // Sample customer data: firstName, lastName, phone, address, postalCode, divisionId
        String[][] customersArray = {
                {"David", "Morgan", "(109)4561111", "1 Log ST", "54321", "2"},
                {"Kyle", "Jordan", "(435)6392222", "2 Alley ST", "98765", "3"},
                {"Crystal", "Bush", "(766)9724444", "3 Columbus ST", "73421", "4"},
                {"John", "James", "(872)8583333", "4 Arizona ST", "43015", "5"},
                {"James", "Farth", "(345)0135555", "5 Idaho ST", "43207", "6"}
        };

        for (String[] customerData : customersArray) {
            Customer customer = new Customer();
            customer.setFirstName(customerData[0]);
            customer.setLastName(customerData[1]);
            customer.setPhone(customerData[2]);
            customer.setAddress(customerData[3]);
            customer.setPostal_code(customerData[4]);

            Long divisionId = Long.valueOf(customerData[5]);
            Optional<Division> divisionOptional = divisionRepository.findById(divisionId);

            if (divisionOptional.isPresent()) {
                customer.setDivision(divisionOptional.get());
                customerRepository.save(customer);
            } else {
                System.err.printf("Division ID %d not found. Skipping customer %s %s.%n",
                        divisionId, customerData[0], customerData[1]);
            }
        }

        System.out.println("Sample customers added successfully.");
    }
}
package com.jabbott.d288.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "customers")
@Getter
@Setter
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id", nullable = false)
    private Long Id;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "create_date", updatable = false)
    @CreationTimestamp
    private Date create_date;

    @Column(name = "customer_first_name", nullable = false)
    private String FirstName;

    @Column(name = "customer_last_name", nullable = false)
    private String LastName;

    @Column(name = "last_update")
    @UpdateTimestamp
    private Date last_update;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "postal_code", nullable = false)
    private String postal_code;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
    private Set<Cart> carts = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "division_id", nullable = false)
    private Division division;
}

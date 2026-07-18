package com.jabbott.d288.dao;

import com.jabbott.d288.entities.Excursion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ExcursionRepository extends JpaRepository<Excursion, Long> {
}

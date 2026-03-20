package com.example.demo.repositories;

import com.example.demo.domain.OutsourcedPart;
import com.example.demo.domain.Part;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 *
 *
 *
 *
 */
public interface OutsourcedPartRepository extends CrudRepository<OutsourcedPart,Long> {
    @Query("SELECT p FROM Part p WHERE p.name LIKE %?1%")
    List<Part> search(String keyword);
}

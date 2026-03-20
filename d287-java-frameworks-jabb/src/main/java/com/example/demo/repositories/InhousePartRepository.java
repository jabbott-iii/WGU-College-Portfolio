package com.example.demo.repositories;

import com.example.demo.domain.InhousePart;
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
public interface InhousePartRepository extends CrudRepository<InhousePart,Long> {
    @Query("SELECT p FROM Part p WHERE p.name LIKE %?1%")
    List<Part> search(String keyword);
}

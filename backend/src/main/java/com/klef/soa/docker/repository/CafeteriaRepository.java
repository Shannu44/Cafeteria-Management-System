package com.klef.soa.docker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.soa.docker.entity.Cafeteria;

public interface CafeteriaRepository extends JpaRepository<Cafeteria, Long> {
}

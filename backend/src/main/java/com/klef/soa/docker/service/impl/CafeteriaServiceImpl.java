
package com.klef.soa.docker.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.entity.Cafeteria;
import com.klef.soa.docker.repository.CafeteriaRepository;
import com.klef.soa.docker.service.CafeteriaService;

@Service
public class CafeteriaServiceImpl implements CafeteriaService {

    @Autowired
    private CafeteriaRepository repository;

    @Override
    public Cafeteria addCafeteria(Cafeteria cafeteria) {
        cafeteria.setId(null);
        return repository.save(cafeteria);
    }

    @Override
    public List<Cafeteria> getAllCafeterias() {
        return repository.findAll();
    }

    @Override
    public String deleteCafeteria(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "Cafeteria deleted successfully";
        }
        return "Cafeteria not found";
    }
}

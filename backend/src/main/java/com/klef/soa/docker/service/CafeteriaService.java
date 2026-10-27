package com.klef.soa.docker.service;

import java.util.List;
import com.klef.soa.docker.entity.Cafeteria;

public interface CafeteriaService {

    Cafeteria addCafeteria(Cafeteria cafeteria);

    List<Cafeteria> getAllCafeterias();

    String deleteCafeteria(Long id);
}
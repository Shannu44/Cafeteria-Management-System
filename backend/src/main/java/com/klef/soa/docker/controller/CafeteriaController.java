package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.dto.CafeteriaRequest;
import com.klef.soa.docker.entity.Cafeteria;
import com.klef.soa.docker.service.CafeteriaService;

@RestController
@RequestMapping("/cafeteria")
@CrossOrigin("*")
public class CafeteriaController {

    private final CafeteriaService service;
 
    public CafeteriaController(CafeteriaService service) {
        this.service = service;
    }
    @GetMapping("/")
    public String home()
    {
        return "Crud Service Project";
    }

    @PostMapping("/Add")
    public ResponseEntity<Cafeteria> add(@RequestBody CafeteriaRequest request) {

        Cafeteria cafeteria = new Cafeteria();
        cafeteria.setCafeteriaName(request.getCafeteriaName());
        cafeteria.setBuilding(request.getBuilding());
        cafeteria.setSeatingCapacity(request.getSeatingCapacity());
        cafeteria.setOpen(request.getOpen());

        return ResponseEntity.status(HttpStatus.CREATED).body(service.addCafeteria(cafeteria));
    }

    @GetMapping("/DisplayAll")
    public ResponseEntity<List<Cafeteria>> displayAll() {
        return ResponseEntity.ok(service.getAllCafeterias());
    }

    @DeleteMapping("/Delete/{id}")
    public String delete(@PathVariable Long id) {
        return service.deleteCafeteria(id);
    }
}

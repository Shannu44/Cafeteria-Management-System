package com.klef.soa.docker.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Cafeteria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cafeteriaName;
    private String building;
    private Integer seatingCapacity;
    private Boolean open;

    public Cafeteria() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCafeteriaName() {
        return cafeteriaName;
    }

    public void setCafeteriaName(String cafeteriaName) {
        this.cafeteriaName = cafeteriaName;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public Integer getSeatingCapacity() {
        return seatingCapacity;
    }

    public void setSeatingCapacity(Integer seatingCapacity) {
        this.seatingCapacity = seatingCapacity;
    }

    public Boolean getOpen() {
        return open;
    }

    public void setOpen(Boolean open) {
        this.open = open;
    }
}
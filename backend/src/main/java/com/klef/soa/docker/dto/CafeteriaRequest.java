package com.klef.soa.docker.dto;

public class CafeteriaRequest {

    private String cafeteriaName;
    private String building;
    private Integer seatingCapacity;
    private Boolean open;

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
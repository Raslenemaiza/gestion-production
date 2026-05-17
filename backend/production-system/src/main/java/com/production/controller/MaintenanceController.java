package com.production.controller;

import com.production.entity.Maintenance;
import com.production.entity.Maintenance.TypeMaintenance;
import com.production.service.MaintenanceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/maintenances")
@RequiredArgsConstructor
@Tag(name = "Maintenances", description = "Gestion des maintenances")
@CrossOrigin(origins = "*")
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    @GetMapping
    @Operation(summary = "Liste toutes les maintenances")
    public ResponseEntity<List<Maintenance>> findAll() {
        return ResponseEntity.ok(maintenanceService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupère une maintenance par son id")
    public ResponseEntity<Maintenance> findById(@PathVariable Long id) {
        return ResponseEntity.ok(maintenanceService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Crée une nouvelle maintenance")
    public ResponseEntity<Maintenance> save(@Valid @RequestBody Maintenance maintenance) {
        return ResponseEntity.status(HttpStatus.CREATED).body(maintenanceService.save(maintenance));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Modifie une maintenance")
    public ResponseEntity<Maintenance> update(@PathVariable Long id,
                                              @Valid @RequestBody Maintenance maintenance) {
        return ResponseEntity.ok(maintenanceService.update(id, maintenance));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprime une maintenance")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        maintenanceService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/type/{type}")
    @Operation(summary = "Filtre les maintenances par type")
    public ResponseEntity<List<Maintenance>> findByType(@PathVariable TypeMaintenance type) {
        return ResponseEntity.ok(maintenanceService.findByType(type));
    }
}
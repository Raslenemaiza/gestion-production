package com.production.controller;

import com.production.entity.Machine;
import com.production.entity.Machine.EtatMachine;
import com.production.service.MachineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/machines")
@RequiredArgsConstructor
@Tag(name = "Machines", description = "Gestion des machines")
@CrossOrigin(origins = "*")
public class MachineController {

    private final MachineService machineService;

    @GetMapping
    @Operation(summary = "Liste toutes les machines")
    public ResponseEntity<List<Machine>> findAll() {
        return ResponseEntity.ok(machineService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupère une machine par son id")
    public ResponseEntity<Machine> findById(@PathVariable Long id) {
        return ResponseEntity.ok(machineService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Crée une nouvelle machine")
    public ResponseEntity<Machine> save(@Valid @RequestBody Machine machine) {
        return ResponseEntity.status(HttpStatus.CREATED).body(machineService.save(machine));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Modifie une machine")
    public ResponseEntity<Machine> update(@PathVariable Long id,
                                          @Valid @RequestBody Machine machine) {
        return ResponseEntity.ok(machineService.update(id, machine));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprime une machine")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        machineService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/etat/{etat}")
    @Operation(summary = "Filtre les machines par état")
    public ResponseEntity<List<Machine>> findByEtat(@PathVariable EtatMachine etat) {
        return ResponseEntity.ok(machineService.findByEtat(etat));
    }
}
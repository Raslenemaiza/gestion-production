package com.production.controller;

import com.production.entity.Technicien;
import com.production.service.TechnicienService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/techniciens")
@RequiredArgsConstructor
@Tag(name = "Techniciens", description = "Gestion des techniciens")
@CrossOrigin(origins = "*")
public class TechnicienController {

    private final TechnicienService technicienService;

    @GetMapping
    @Operation(summary = "Liste tous les techniciens")
    public ResponseEntity<List<Technicien>> findAll() {
        return ResponseEntity.ok(technicienService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupère un technicien par son id")
    public ResponseEntity<Technicien> findById(@PathVariable Long id) {
        return ResponseEntity.ok(technicienService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Crée un nouveau technicien")
    public ResponseEntity<Technicien> save(@Valid @RequestBody Technicien technicien) {
        return ResponseEntity.status(HttpStatus.CREATED).body(technicienService.save(technicien));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Modifie un technicien")
    public ResponseEntity<Technicien> update(@PathVariable Long id,
                                             @Valid @RequestBody Technicien technicien) {
        return ResponseEntity.ok(technicienService.update(id, technicien));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprime un technicien")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        technicienService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    @Operation(summary = "Recherche techniciens par nom")
    public ResponseEntity<List<Technicien>> search(@RequestParam String nom) {
        return ResponseEntity.ok(technicienService.findByNom(nom));
    }
}
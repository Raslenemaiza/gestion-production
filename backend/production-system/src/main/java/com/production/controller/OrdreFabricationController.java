package com.production.controller;

import com.production.entity.OrdreFabrication;
import com.production.entity.OrdreFabrication.StatutOrdre;
import com.production.service.OrdreFabricationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ordres")
@RequiredArgsConstructor
@Tag(name = "Ordres de Fabrication", description = "Gestion des ordres de fabrication")
@CrossOrigin(origins = "*")
public class OrdreFabricationController {

    private final OrdreFabricationService ordreService;

    @GetMapping
    @Operation(summary = "Liste tous les ordres")
    public ResponseEntity<List<OrdreFabrication>> findAll() {
        return ResponseEntity.ok(ordreService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupère un ordre par son id")
    public ResponseEntity<OrdreFabrication> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ordreService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Crée un nouvel ordre de fabrication")
    public ResponseEntity<OrdreFabrication> save(@Valid @RequestBody OrdreFabrication ordre) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ordreService.save(ordre));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Modifie un ordre")
    public ResponseEntity<OrdreFabrication> update(@PathVariable Long id,
                                                   @Valid @RequestBody OrdreFabrication ordre) {
        return ResponseEntity.ok(ordreService.update(id, ordre));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprime un ordre")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        ordreService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/statut")
    @Operation(summary = "Change le statut d'un ordre")
    public ResponseEntity<OrdreFabrication> changerStatut(@PathVariable Long id,
                                                          @RequestParam StatutOrdre statut) {
        return ResponseEntity.ok(ordreService.changerStatut(id, statut));
    }

    @GetMapping("/statut/{statut}")
    @Operation(summary = "Filtre les ordres par statut")
    public ResponseEntity<List<OrdreFabrication>> findByStatut(@PathVariable StatutOrdre statut) {
        return ResponseEntity.ok(ordreService.findByStatut(statut));
    }
}
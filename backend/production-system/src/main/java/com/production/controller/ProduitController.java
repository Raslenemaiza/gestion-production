package com.production.controller;

import com.production.entity.Produit;
import com.production.service.ProduitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/produits")
@RequiredArgsConstructor
@Tag(name = "Produits", description = "Gestion des produits")
@CrossOrigin(origins = "*")
public class ProduitController {

    private final ProduitService produitService;

    @GetMapping
    @Operation(summary = "Liste tous les produits")
    public ResponseEntity<List<Produit>> findAll() {
        return ResponseEntity.ok(produitService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupère un produit par son id")
    public ResponseEntity<Produit> findById(@PathVariable Long id) {
        return ResponseEntity.ok(produitService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Crée un nouveau produit")
    public ResponseEntity<Produit> save(@Valid @RequestBody Produit produit) {
        return ResponseEntity.status(HttpStatus.CREATED).body(produitService.save(produit));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Modifie un produit")
    public ResponseEntity<Produit> update(@PathVariable Long id,
                                          @Valid @RequestBody Produit produit) {
        return ResponseEntity.ok(produitService.update(id, produit));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprime un produit")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        produitService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    @Operation(summary = "Recherche produits par nom")
    public ResponseEntity<List<Produit>> search(@RequestParam String nom) {
        return ResponseEntity.ok(produitService.findByNom(nom));
    }
}
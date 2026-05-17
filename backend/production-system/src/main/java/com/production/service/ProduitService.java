package com.production.service;

import com.production.entity.Produit;
import com.production.repository.ProduitRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProduitService {

    private final ProduitRepository produitRepository;

    // Récupérer tous les produits
    public List<Produit> findAll() {
        return produitRepository.findAll();
    }

    // Récupérer un produit par son id
    public Produit findById(Long id) {
        return produitRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produit non trouvé avec id: " + id));
    }

    // Créer un nouveau produit
    public Produit save(Produit produit) {
        return produitRepository.save(produit);
    }

    // Modifier un produit existant
    public Produit update(Long id, Produit produit) {
        Produit existing = findById(id);
        existing.setNom(produit.getNom());
        existing.setType(produit.getType());
        existing.setStock(produit.getStock());
        existing.setFournisseur(produit.getFournisseur());
        return produitRepository.save(existing);
    }

    // Supprimer un produit
    public void delete(Long id) {
        findById(id); // vérifie que le produit existe
        produitRepository.deleteById(id);
    }

    // Rechercher par nom
    public List<Produit> findByNom(String nom) {
        return produitRepository.findByNomContaining(nom);
    }

    // Rechercher par type
    public List<Produit> findByType(String type) {
        return produitRepository.findByType(type);
    }
}
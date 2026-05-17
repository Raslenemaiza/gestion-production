package com.production.repository;

import com.production.entity.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {

    // Chercher par nom
    List<Produit> findByNomContaining(String nom);

    // Chercher par type
    List<Produit> findByType(String type);

    // Chercher par fournisseur
    List<Produit> findByFournisseur(String fournisseur);
}
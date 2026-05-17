package com.production.repository;

import com.production.entity.OrdreFabrication;
import com.production.entity.OrdreFabrication.StatutOrdre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrdreFabricationRepository extends JpaRepository<OrdreFabrication, Long> {

    // Chercher par statut
    List<OrdreFabrication> findByStatut(StatutOrdre statut);

    // Chercher par produit
    List<OrdreFabrication> findByProduitId(Long produitId);

    // Chercher par machine
    List<OrdreFabrication> findByMachineId(Long machineId);
}
package com.production.service;

import com.production.entity.OrdreFabrication;
import com.production.entity.OrdreFabrication.StatutOrdre;
import com.production.repository.OrdreFabricationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrdreFabricationService {

    private final OrdreFabricationRepository ordreRepository;

    public List<OrdreFabrication> findAll() {
        return ordreRepository.findAll();
    }

    public OrdreFabrication findById(Long id) {
        return ordreRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ordre non trouvé avec id: " + id));
    }

    public OrdreFabrication save(OrdreFabrication ordre) {
        return ordreRepository.save(ordre);
    }

    public OrdreFabrication update(Long id, OrdreFabrication ordre) {
        OrdreFabrication existing = findById(id);
        existing.setQuantite(ordre.getQuantite());
        existing.setDate(ordre.getDate());
        existing.setMachine(ordre.getMachine());
        existing.setProduit(ordre.getProduit());
        existing.setStatut(ordre.getStatut());
        return ordreRepository.save(existing);
    }

    public void delete(Long id) {
        findById(id);
        ordreRepository.deleteById(id);
    }

    // Changer le statut d'un ordre
    public OrdreFabrication changerStatut(Long id, StatutOrdre statut) {
        OrdreFabrication existing = findById(id);
        existing.setStatut(statut);
        return ordreRepository.save(existing);
    }

    public List<OrdreFabrication> findByStatut(StatutOrdre statut) {
        return ordreRepository.findByStatut(statut);
    }
}
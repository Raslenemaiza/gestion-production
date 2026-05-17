package com.production.service;

import com.production.entity.Technicien;
import com.production.repository.TechnicienRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TechnicienService {

    private final TechnicienRepository technicienRepository;

    public List<Technicien> findAll() {
        return technicienRepository.findAll();
    }

    public Technicien findById(Long id) {
        return technicienRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Technicien non trouvé avec id: " + id));
    }

    public Technicien save(Technicien technicien) {
        return technicienRepository.save(technicien);
    }

    public Technicien update(Long id, Technicien technicien) {
        Technicien existing = findById(id);
        existing.setNom(technicien.getNom());
        existing.setCompetences(technicien.getCompetences());
        existing.setMachineAssignee(technicien.getMachineAssignee());
        return technicienRepository.save(existing);
    }

    public void delete(Long id) {
        findById(id);
        technicienRepository.deleteById(id);
    }

    public List<Technicien> findByNom(String nom) {
        return technicienRepository.findByNomContaining(nom);
    }
}
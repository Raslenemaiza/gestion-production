package com.production.service;

import com.production.entity.Maintenance;
import com.production.entity.Maintenance.TypeMaintenance;
import com.production.repository.MaintenanceRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MaintenanceService {

    private final MaintenanceRepository maintenanceRepository;

    public List<Maintenance> findAll() {
        return maintenanceRepository.findAll();
    }

    public Maintenance findById(Long id) {
        return maintenanceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Maintenance non trouvée avec id: " + id));
    }

    public Maintenance save(Maintenance maintenance) {
        return maintenanceRepository.save(maintenance);
    }

    public Maintenance update(Long id, Maintenance maintenance) {
        Maintenance existing = findById(id);
        existing.setMachine(maintenance.getMachine());
        existing.setTechnicien(maintenance.getTechnicien());
        existing.setDate(maintenance.getDate());
        existing.setType(maintenance.getType());
        return maintenanceRepository.save(existing);
    }

    public void delete(Long id) {
        findById(id);
        maintenanceRepository.deleteById(id);
    }

    public List<Maintenance> findByType(TypeMaintenance type) {
        return maintenanceRepository.findByType(type);
    }
}
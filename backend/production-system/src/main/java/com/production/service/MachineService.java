package com.production.service;

import com.production.entity.Machine;
import com.production.entity.Machine.EtatMachine;
import com.production.repository.MachineRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MachineService {

    private final MachineRepository machineRepository;

    public List<Machine> findAll() {
        return machineRepository.findAll();
    }

    public Machine findById(Long id) {
        return machineRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Machine non trouvée avec id: " + id));
    }

    public Machine save(Machine machine) {
        return machineRepository.save(machine);
    }

    public Machine update(Long id, Machine machine) {
        Machine existing = findById(id);
        existing.setNom(machine.getNom());
        existing.setEtat(machine.getEtat());
        existing.setMaintenanceProchaine(machine.getMaintenanceProchaine());
        return machineRepository.save(existing);
    }

    public void delete(Long id) {
        findById(id);
        machineRepository.deleteById(id);
    }

    public List<Machine> findByEtat(EtatMachine etat) {
        return machineRepository.findByEtat(etat);
    }
}
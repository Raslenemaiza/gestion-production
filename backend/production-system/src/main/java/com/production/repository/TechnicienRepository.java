package com.production.repository;

import com.production.entity.Technicien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TechnicienRepository extends JpaRepository<Technicien, Long> {

    // Chercher par nom
    List<Technicien> findByNomContaining(String nom);

    // Chercher les techniciens d'une machine
    List<Technicien> findByMachineAssigneeId(Long machineId);
}
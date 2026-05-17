package com.production.repository;

import com.production.entity.Maintenance;
import com.production.entity.Maintenance.TypeMaintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MaintenanceRepository extends JpaRepository<Maintenance, Long> {

    // Chercher par machine
    List<Maintenance> findByMachineId(Long machineId);

    // Chercher par technicien
    List<Maintenance> findByTechnicienId(Long technicienId);

    // Chercher par type
    List<Maintenance> findByType(TypeMaintenance type);
}
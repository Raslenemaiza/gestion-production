package com.production.repository;

import com.production.entity.Machine;
import com.production.entity.Machine.EtatMachine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MachineRepository extends JpaRepository<Machine, Long> {

    // Chercher par état
    List<Machine> findByEtat(EtatMachine etat);

    // Chercher par nom
    List<Machine> findByNomContaining(String nom);
}
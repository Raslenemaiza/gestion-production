package com.production.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "machines")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Machine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Column(nullable = false)
    private String nom;

    @NotNull(message = "L'état est obligatoire")
    @Enumerated(EnumType.STRING)
    private EtatMachine etat;

    private LocalDate maintenanceProchaine;

    @JsonIgnore
    @OneToMany(mappedBy = "machineAssignee")
    private List<Technicien> techniciens = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "machine")
    private List<OrdreFabrication> ordresFabrication = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "machine")
    private List<Maintenance> maintenances = new ArrayList<>();

    public enum EtatMachine {
        EN_SERVICE,
        EN_PANNE,
        EN_MAINTENANCE,
        ARRETEE
    }
}
package com.production.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "maintenances")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Maintenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "machine_id", nullable = false)
    @NotNull(message = "La machine est obligatoire")
    private Machine machine;

    @ManyToOne
    @JoinColumn(name = "technicien_id", nullable = false)
    @NotNull(message = "Le technicien est obligatoire")
    private Technicien technicien;

    @NotNull(message = "La date est obligatoire")
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Le type est obligatoire")
    private TypeMaintenance type;

    public enum TypeMaintenance {
        PREVENTIVE,
        CORRECTIVE,
        URGENCE
    }
}
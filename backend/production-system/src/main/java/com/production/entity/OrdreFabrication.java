package com.production.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "ordres_fabrication")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrdreFabrication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "produit_id", nullable = false)
    @NotNull(message = "Le produit est obligatoire")
    private Produit produit;

    @Min(value = 1, message = "La quantité doit être au moins 1")
    @Column(nullable = false)
    private Integer quantite;

    @NotNull(message = "La date est obligatoire")
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "machine_id")
    private Machine machine;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private StatutOrdre statut = StatutOrdre.EN_ATTENTE;

    public enum StatutOrdre {
        EN_ATTENTE,
        EN_COURS,
        TERMINE,
        ANNULE
    }
}
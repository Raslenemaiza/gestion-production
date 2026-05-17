package com.production.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "techniciens")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Technicien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Column(nullable = false)
    private String nom;

    @Column(columnDefinition = "TEXT")
    private String competences;

    
    @ManyToOne
    @JoinColumn(name = "machine_id")
    private Machine machineAssignee;

    @JsonIgnore
    @OneToMany(mappedBy = "technicien")
    private List<Maintenance> maintenances = new ArrayList<>();
}
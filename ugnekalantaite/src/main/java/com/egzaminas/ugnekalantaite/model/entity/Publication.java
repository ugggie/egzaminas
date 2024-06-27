package com.egzaminas.ugnekalantaite.model.entity;

import com.egzaminas.ugnekalantaite.model.dto.PublicationCreationDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"publications\"")
@Data
public class Publication {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    private String name;
    private String description;
//    @Enumerated(EnumType.STRING)
//    private PublicationStatus status;

//    @OneToMany(mappedBy = "publication", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Task> tasks;

    public Publication(PublicationCreationDTO publicationCreationDTO) {
        this.name = publicationCreationDTO.getName();
        this.description = publicationCreationDTO.getDescription();
//        this.status = publicationCreationDTO.getStatus();
//        this.tasks = new ArrayList<>();
    }

    public Publication() {

    }
}

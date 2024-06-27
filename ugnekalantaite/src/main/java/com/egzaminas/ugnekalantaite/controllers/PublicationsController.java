package com.egzaminas.ugnekalantaite.controllers;

import com.egzaminas.ugnekalantaite.model.dto.PublicationCreationDTO;
import com.egzaminas.ugnekalantaite.model.entity.Publication;
import com.egzaminas.ugnekalantaite.services.PublicationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/publications")
@Validated
public class PublicationsController {
    private final PublicationsService publicationsService;

    @Autowired
    public PublicationsController(PublicationsService projectService) {
        this.publicationsService = projectService;
    }
    @GetMapping
    public ResponseEntity<List<Publication>> getPublications() {
        List<Publication> publications = publicationsService.getAllPublications();
        return new ResponseEntity<>(publications, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Publication> createPublication(@RequestBody PublicationCreationDTO publicationCreationDTO) {
        Publication createdProject = publicationsService.createPublication(publicationCreationDTO);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Publication> getPublicationById(@PathVariable Long id) {
        Publication project = publicationsService.getPublicationById(id);
        if (project != null) {
            return new ResponseEntity<>(project, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublicationById(@PathVariable Long id) {
        publicationsService.deletePublicationById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Publication> updatePublication(@PathVariable Long id, @RequestBody Publication publication) {
        Publication updatedPublication = publicationsService.updatePublication(id, publication);
        if (updatedPublication != null) {
            return new ResponseEntity<>(updatedPublication, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
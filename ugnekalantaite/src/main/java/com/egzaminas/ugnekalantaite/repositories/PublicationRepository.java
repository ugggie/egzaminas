package com.egzaminas.ugnekalantaite.repositories;

import com.egzaminas.ugnekalantaite.model.entity.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Long> {
//    List<Publication> findByNameContainingIgnoreCaseAndStatus(String name, ProjectStatus status);
    List<Publication> findByNameContainingIgnoreCase(String name);
//    List<Publication> findByStatus(ProjectStatus status);
}
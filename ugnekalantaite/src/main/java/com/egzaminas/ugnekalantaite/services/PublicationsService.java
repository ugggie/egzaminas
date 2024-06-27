package com.egzaminas.ugnekalantaite.services;

import com.egzaminas.ugnekalantaite.model.entity.Publication;
import com.egzaminas.ugnekalantaite.model.dto.PublicationCreationDTO;


import java.util.List;

public interface PublicationsService {
    Publication createPublication(PublicationCreationDTO publicationCreationDTO);
    Publication getPublicationById(Long id);
    void deletePublicationById(Long id);
    Publication updatePublication(Long id, Publication publication);
    List<Publication> getAllPublications();
//    List<Publication> findPublicationsByName(String name, String show);

}

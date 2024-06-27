package com.egzaminas.ugnekalantaite.services;

import com.egzaminas.ugnekalantaite.model.dto.PublicationCreationDTO;
import com.egzaminas.ugnekalantaite.model.entity.Publication;
import com.egzaminas.ugnekalantaite.repositories.PublicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PublicationsServiceImpl implements PublicationsService {

    private final PublicationRepository publicationRepository;

    public PublicationsServiceImpl(PublicationRepository publicationRepository) {
        this.publicationRepository = publicationRepository;
    }

    @Override
    public Publication createPublication(PublicationCreationDTO publicationCreationDTO) {
        Publication publication = new Publication(publicationCreationDTO);
        return publicationRepository.save(publication);
    }

    @Override
    public Publication getPublicationById(Long id) {
        return publicationRepository.findById(id).orElse(null);
    }

    @Override
    public void deletePublicationById(Long id) {
        publicationRepository.deleteById(id);
    }

    @Override
    public Publication updatePublication(Long id, Publication publication) {
        Optional<Publication> optionalPublication = publicationRepository.findById(id);
        if (optionalPublication.isPresent()) {
            Publication existingPublication = optionalPublication.get();
            existingPublication.setName(publication.getName());
            existingPublication.setDescription(publication.getDescription());
            return publicationRepository.save(existingPublication);
        } else {
            return null;
        }
    }

    @Override
    public List<Publication> getAllPublications() {
        return publicationRepository.findAll();
    }
}


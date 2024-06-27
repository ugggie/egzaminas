package com.egzaminas.ugnekalantaite.model.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class PublicationCreationDTO {
    @NotEmpty
    @Size(min = 1, max = 50, message = "Name must be between 1 and 50 characters")
    private String name;
    @Size(min = 0, max = 600, message = "Description must be between 0 and 600 characters")
    private String description;
}
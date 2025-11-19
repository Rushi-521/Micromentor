package com.micromentor.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skills")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skillId;

    @Column(unique = true, nullable = false, length = 100)
    private String name;

    @Column(length = 50)
    private String category; // ARTS, TECH, COOKING, LANGUAGE, SPORTS, MUSIC, etc.

    @Column(length = 500)
    private String description;

    private Integer difficultyLevel; // 1-5

    @Builder.Default
    private Integer popularityScore = 0;

    @Builder.Default
    private Boolean requiresCertification = false;

    @Builder.Default
    private Boolean isRareSkill = false; // For Skill Archaeology feature

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_skill_id")
    private Skill parentSkill; // For skill trees (e.g., "Guitar" parent is "Music")
}
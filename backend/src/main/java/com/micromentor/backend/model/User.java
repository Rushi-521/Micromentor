package com.micromentor.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Point;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @Column(columnDefinition = "geometry(Point,4326)")
    private Point location;

    @Column(length = 20)
    private String locationPrecision = "APPROXIMATE"; // EXACT, APPROXIMATE, HIDDEN

    private Double availabilityRadius = 1.0; // in kilometers

    @Builder.Default
    private Integer reputationScore = 0;

    @Builder.Default
    private Integer totalSessionsTaught = 0;

    @Builder.Default
    private Integer totalSessionsLearned = 0;

    @Builder.Default
    private Boolean isVerified = false;

    @Column(length = 20)
    private String phoneNumber;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime lastActive;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        lastActive = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        lastActive = LocalDateTime.now();
    }
}
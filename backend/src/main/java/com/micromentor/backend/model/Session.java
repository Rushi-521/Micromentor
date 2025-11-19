package com.micromentor.backend.model;


import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Point;
import java.time.LocalDateTime;

@Entity
@Table(name = "sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sessionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentor_id", nullable = false)
    private User mentor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentee_id", nullable = false)
    private User mentee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(length = 20)
    private String sessionType; // IN_PERSON, VIDEO

    @Column(columnDefinition = "geometry(Point,4326)")
    private Point meetingPoint;

    private LocalDateTime scheduledTime;

    @Builder.Default
    private Integer durationMinutes = 15;

    @Column(length = 20)
    private String status; // PENDING, CONFIRMED, COMPLETED, CANCELLED

    private Integer rating; // 1-5 stars (filled after completion)

    @Column(length = 1000)
    private String feedback;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime completedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) {
            status = "PENDING";
        }
    }
}
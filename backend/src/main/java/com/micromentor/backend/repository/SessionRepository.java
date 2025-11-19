package com.micromentor.backend.repository;
import com.micromentor.backend.model.Session;
import com.micromentor.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

    List<Session> findByMentorAndStatus(User mentor, String status);

    List<Session> findByMenteeAndStatus(User mentee, String status);

    List<Session> findByMentorOrderByScheduledTimeDesc(User mentor);

    List<Session> findByMenteeOrderByScheduledTimeDesc(User mentee);

    @Query("SELECT s FROM Session s WHERE s.mentor = :user OR s.mentee = :user ORDER BY s.scheduledTime DESC")
    List<Session> findAllUserSessions(@Param("user") User user);

    @Query("SELECT s FROM Session s WHERE s.status = 'COMPLETED' AND s.mentee = :user")
    List<Session> findCompletedSessionsAsMentee(@Param("user") User user);

    @Query("SELECT COUNT(s) FROM Session s WHERE s.mentor = :user AND s.status = 'COMPLETED'")
    Long countCompletedSessionsAsMentor(@Param("user") User user);

    @Query("SELECT AVG(s.rating) FROM Session s WHERE s.mentor = :user AND s.rating IS NOT NULL")
    Double calculateAverageRating(@Param("user") User user);
}
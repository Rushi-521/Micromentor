package com.micromentor.backend.repository;

import com.micromentor.backend.model.Skill;
import com.micromentor.backend.model.User;
import com.micromentor.backend.model.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {

    List<UserSkill> findByUser(User user);

    List<UserSkill> findByUserAndCanTeachTrue(User user);

    List<UserSkill> findByUserAndWantsToLearnTrue(User user);

    Optional<UserSkill> findByUserAndSkill(User user, Skill skill);

    @Query("SELECT us FROM UserSkill us WHERE us.skill = :skill AND us.canTeach = true")
    List<UserSkill> findTeachersBySkill(@Param("skill") Skill skill);

    // Find users who can teach a specific skill within radius
    @Query(value = """
        SELECT us.* FROM user_skills us
        JOIN users u ON us.user_id = u.user_id
        WHERE us.skill_id = :skillId
        AND us.can_teach = true
        AND ST_DWithin(
            u.location,
            ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography,
            :radiusMeters
        )
        ORDER BY us.avg_rating DESC, us.teaching_sessions_count DESC
        LIMIT 20
        """, nativeQuery = true)
    List<UserSkill> findNearbyTeachers(
            @Param("skillId") Long skillId,
            @Param("latitude") Double latitude,
            @Param("longitude") Double longitude,
            @Param("radiusMeters") Double radiusMeters
    );
}
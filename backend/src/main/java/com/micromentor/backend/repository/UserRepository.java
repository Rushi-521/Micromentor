package com.micromentor.backend.repository;

import com.micromentor.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    // Find users within radius using PostGIS
    @Query(value = """
        SELECT u.* FROM users u
        WHERE ST_DWithin(
            u.location,
            ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography,
            :radiusMeters
        )
        AND u.user_id != :excludeUserId
        ORDER BY ST_Distance(
            u.location,
            ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography
        )
        LIMIT 50
        """, nativeQuery = true)
    List<User> findUsersWithinRadius(
            @Param("latitude") Double latitude,
            @Param("longitude") Double longitude,
            @Param("radiusMeters") Double radiusMeters,
            @Param("excludeUserId") Long excludeUserId
    );

    // Calculate distance between two users
    @Query(value = """
        SELECT ST_Distance(
            (SELECT location FROM users WHERE user_id = :userId1)::geography,
            (SELECT location FROM users WHERE user_id = :userId2)::geography
        )
        """, nativeQuery = true)
    Double calculateDistanceBetweenUsers(
            @Param("userId1") Long userId1,
            @Param("userId2") Long userId2
    );
}

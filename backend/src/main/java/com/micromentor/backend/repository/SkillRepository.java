package com.micromentor.backend.repository;


import com.micromentor.backend.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    Optional<Skill> findByName(String name);

    List<Skill> findByCategory(String category);

    List<Skill> findByIsRareSkillTrue();

    @Query("SELECT s FROM Skill s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Skill> searchByName(@Param("keyword") String keyword);

    @Query("SELECT s FROM Skill s ORDER BY s.popularityScore DESC")
    List<Skill> findTopSkills();
}
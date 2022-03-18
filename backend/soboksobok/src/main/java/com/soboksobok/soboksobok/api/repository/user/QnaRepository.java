package com.soboksobok.soboksobok.api.repository.user;

import com.soboksobok.soboksobok.api.entity.Qna;
import com.soboksobok.soboksobok.api.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
public interface QnaRepository extends JpaRepository<Qna,Long> {
    List<Qna> findAll();
    Optional<Qna> findById(Long qna_id);

    @Query( value = "select i from Qna i left join fetch i.user " +
            "where i.user.userSeq = :userId")
    List<Qna> findAllByUserId(@Param("userId") Long userId);

    @Query( value = "select i from Qna i left join fetch i.user " +
            "where i.user.userSeq = :userId and i.qna_id = :qnaId")
    Optional<Qna> findByQnaIdAndUserId(@Param("qnaId") Long qna_id, @Param("userId") Long userId);
}

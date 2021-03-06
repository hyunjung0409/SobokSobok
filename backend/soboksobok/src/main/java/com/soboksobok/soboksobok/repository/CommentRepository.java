package com.soboksobok.soboksobok.repository;

import com.soboksobok.soboksobok.domain.Comment;
import com.soboksobok.soboksobok.domain.Qna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import java.util.List;

@EnableJpaRepositories
public interface CommentRepository extends JpaRepository<Comment,Long> {

}

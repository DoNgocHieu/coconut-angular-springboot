package com.coconutmusic.repository;

import com.coconutmusic.entity.MyList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyListRepository extends JpaRepository<MyList, Long> {
    boolean existsByUser_IdAndMusic_Id(Long userId, Long musicId);
    void deleteByUser_IdAndMusic_Id(Long userId, Long musicId);
    List<MyList> findByUser_IdOrderByCreatedAtDesc(Long userId);

}

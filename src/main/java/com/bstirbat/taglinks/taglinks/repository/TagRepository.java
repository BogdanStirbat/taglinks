package com.bstirbat.taglinks.taglinks.repository;

import com.bstirbat.taglinks.taglinks.entity.TagEntity;

import java.util.List;

public interface TagRepository {

    TagEntity findById(long id);

    TagEntity save(TagEntity tagEntity);

    TagEntity update(TagEntity tagEntity);

    void delete(long tagEntityId);

    void delete(TagEntity tagEntity);

    List<TagEntity> findAll();
}

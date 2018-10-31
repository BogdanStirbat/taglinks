package com.bstirbat.taglinks.taglinks.repository;


import com.bstirbat.taglinks.taglinks.entity.LinkEntity;

import java.util.List;

public interface LinkRepository {

    LinkEntity findById(long id);

    LinkEntity save(LinkEntity linkEntity);

    LinkEntity update(LinkEntity linkEntity);

    void delete(long linkEntityId);

    void delete(LinkEntity linkEntity);

    List<LinkEntity> findAll();
}

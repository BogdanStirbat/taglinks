package com.bstirbat.taglinks.taglinks.repository;

import com.bstirbat.taglinks.taglinks.entity.LinkEntity;
import com.bstirbat.taglinks.taglinks.entity.LinkTagEntity;
import com.bstirbat.taglinks.taglinks.entity.TagEntity;

import java.util.List;

public interface LinkTagRepository {

    LinkTagEntity findById(long id);

    LinkTagEntity save(LinkTagEntity linkTagEntity);

    LinkTagEntity update(LinkTagEntity linkTagEntity);

    void delete(long linkTagEntityId);

    void delete(LinkTagEntity linkTagEntity);

    void delete(long linkId, long tagId);

    List<TagEntity> allForLink(long linkId);

    List<LinkEntity> allForTag(long tagId);
}

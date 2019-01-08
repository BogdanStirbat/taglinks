package com.bstirbat.taglinks.taglinks.repository;

import com.bstirbat.taglinks.taglinks.entity.LinkEntity;
import com.bstirbat.taglinks.taglinks.entity.LinkTagEntity;
import com.bstirbat.taglinks.taglinks.entity.TagEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class LinkTagRepositoryImpl implements LinkTagRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public LinkTagEntity findById(long id) {
        return entityManager.find(LinkTagEntity.class, id);
    }

    @Override
    @Transactional
    public LinkTagEntity save(LinkTagEntity linkTagEntity) {
        entityManager.persist(linkTagEntity);
        return linkTagEntity;
    }

    @Override
    @Transactional
    public LinkTagEntity update(LinkTagEntity linkTagEntity) {
        return entityManager.merge(linkTagEntity);
    }

    @Override
    @Transactional
    public void delete(long linkTagEntityId) {
        LinkTagEntity linkTagEntity = this.findById(linkTagEntityId);

        if (linkTagEntity != null) {
            delete(linkTagEntity);
        }
    }

    @Override
    @Transactional
    public void delete(LinkTagEntity linkTagEntity) {
        entityManager.remove(linkTagEntity);
    }

    @Override
    @Transactional
    public void delete(long linkId, long tagId) {
        List<LinkTagEntity> linkTagEntities = entityManager.createQuery("select lt from LinkTagEntity lt " +
                "where lt.linkId=:linkId and lt.tagId=:tagId", LinkTagEntity.class)
                .setParameter("linkId", linkId)
                .setParameter("tagId", tagId)
                .getResultList();

        if (linkTagEntities != null && !linkTagEntities.isEmpty()) {
            LinkTagEntity linkTagEntity = linkTagEntities.get(0);
            delete(linkTagEntity);
        }
    }

    @Override
    public List<TagEntity> allForLink(long linkId) {
        return entityManager.createQuery(
                "select te from LinkTagEntity lt " +
                        "inner join TagEntity te on lt.tagId=te.id " +
                        "where lt.linkId=:linkId ", TagEntity.class)
                .setParameter("linkId", linkId)
                .getResultList();
    }

    @Override
    public List<LinkEntity> allForTag(long tagId) {
        return entityManager.createQuery(
                "select le from LinkTagEntity lt " +
                        "inner join LinkEntity le on lt.linkId=le.id " +
                        "where lt.tagId=:tagId ", LinkEntity.class)
                .setParameter("tagId", tagId)
                .getResultList();
    }
}

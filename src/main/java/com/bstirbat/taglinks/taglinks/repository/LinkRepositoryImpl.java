package com.bstirbat.taglinks.taglinks.repository;

import com.bstirbat.taglinks.taglinks.entity.LinkEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class LinkRepositoryImpl implements LinkRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public LinkEntity findById(long id) {
        return entityManager.find(LinkEntity.class, id);
    }

    @Override
    @Transactional
    public LinkEntity save(LinkEntity linkEntity) {
        entityManager.persist(linkEntity);
        return linkEntity;
    }

    @Override
    @Transactional
    public LinkEntity update(LinkEntity linkEntity) {
        return entityManager.merge(linkEntity);
    }

    @Override
    @Transactional
    public void delete(long linkEntityId) {
        LinkEntity linkEntity = this.findById(linkEntityId);

        if (linkEntity != null) {
            this.delete(linkEntity);
        }
    }

    @Override
    @Transactional
    public void delete(LinkEntity linkEntity) {
        entityManager.remove(linkEntity);
    }

    @Override
    public List<LinkEntity> findAll() {
        return entityManager.createQuery("select l from LinkEntity l", LinkEntity.class)
                .getResultList();
    }
}

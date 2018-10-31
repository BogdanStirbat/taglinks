package com.bstirbat.taglinks.taglinks.repository;

import com.bstirbat.taglinks.taglinks.entity.TagEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class TagRepositoryImpl implements TagRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public TagEntity findById(long id) {
        return entityManager.find(TagEntity.class, id);
    }

    @Override
    @Transactional
    public TagEntity save(TagEntity tagEntity) {
        entityManager.persist(tagEntity);
        return tagEntity;
    }

    @Override
    @Transactional
    public TagEntity update(TagEntity tagEntity) {
        return entityManager.merge(tagEntity);
    }

    @Override
    @Transactional
    public void delete(long tagEntityId) {
        TagEntity tagEntity = this.findById(tagEntityId);

        if (tagEntity != null) {
            delete(tagEntity);
        }
    }

    @Override
    @Transactional
    public void delete(TagEntity tagEntity) {
        entityManager.remove(tagEntity);
    }

    @Override
    public List<TagEntity> findAll() {
        return entityManager.createQuery("select t from TagEntity t", TagEntity.class)
                .getResultList();
    }
}

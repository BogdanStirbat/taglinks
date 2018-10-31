package com.bstirbat.taglinks.taglinks.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name = "LinkTagEntity")
@Table(name = "linktag")
public class LinkTagEntity {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "link_id")
    private Long linkId;

    @Column(name = "tag_id")
    private Long tagId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLinkId() {
        return linkId;
    }

    public void setLinkId(Long linkId) {
        this.linkId = linkId;
    }

    public Long getTagId() {
        return tagId;
    }

    public void setTagId(Long tagId) {
        this.tagId = tagId;
    }

    @Override
    public String toString() {
        return "LinkTagEntity{" +
                "id=" + id +
                ", linkId=" + linkId +
                ", tagId=" + tagId +
                '}';
    }
}

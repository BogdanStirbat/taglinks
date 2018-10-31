package com.bstirbat.taglinks.taglinks.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name = "LinkEntity")
@Table(name = "link")
public class LinkEntity {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String url;

    @Column
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "LinkEntity{" +
                "id=" + id +
                ", url='" + url + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}

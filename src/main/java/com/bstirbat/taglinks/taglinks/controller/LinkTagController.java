package com.bstirbat.taglinks.taglinks.controller;

import com.bstirbat.taglinks.taglinks.entity.LinkEntity;
import com.bstirbat.taglinks.taglinks.entity.LinkTagEntity;
import com.bstirbat.taglinks.taglinks.entity.TagEntity;
import com.bstirbat.taglinks.taglinks.repository.LinkTagRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/linktag")
@CrossOrigin
public class LinkTagController {

    private static final Logger LOGGER = LoggerFactory.getLogger(LinkTagController.class);

    @Autowired
    private LinkTagRepository linkTagRepository;

    @GetMapping("/{id}")
    @ResponseBody
    public LinkTagEntity findById(@PathVariable String id) {
        LOGGER.info("findById, id=<{}>", id);

        return linkTagRepository.findById(Long.parseLong(id));
    }

    @PostMapping
    @ResponseBody
    public LinkTagEntity save(@RequestBody LinkTagEntity linkTagEntity) {
        LOGGER.info("save, linkTagEntity=<{}>", linkTagEntity);

        return linkTagRepository.save(linkTagEntity);
    }

    @PutMapping
    @ResponseBody
    public LinkTagEntity update(@RequestBody LinkTagEntity linkTagEntity) {
        LOGGER.info("update, linkTagEntity=<{}>", linkTagEntity);

        return linkTagRepository.update(linkTagEntity);
    }

    @DeleteMapping("link/{linkId}/tag/{tagId}")
    @ResponseBody
    public String delete(@PathVariable String linkId, @PathVariable String tagId) {
        LOGGER.info("delete, linkId=<{}>, tagId=<{}>", linkId, tagId);

        linkTagRepository.delete(Long.valueOf(linkId), Long.valueOf(tagId));

        return "{\"success\": 0}";
    }

    @GetMapping("/all/tag/{tagId}")
    @ResponseBody
    public List<LinkEntity> findAllForTag(@PathVariable Long tagId) {
        LOGGER.info("findAllForTag, tagId=<{}>", tagId);

        return linkTagRepository.allForTag(tagId);
    }

    @GetMapping("/all/link/{linkId}")
    @ResponseBody
    public List<TagEntity> findAllForLink(@PathVariable Long linkId) {
        LOGGER.info("findAllForLink, linkId=<{}>", linkId);

        return linkTagRepository.allForLink(linkId);
    }
}

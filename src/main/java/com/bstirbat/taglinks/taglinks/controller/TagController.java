package com.bstirbat.taglinks.taglinks.controller;

import com.bstirbat.taglinks.taglinks.entity.TagEntity;
import com.bstirbat.taglinks.taglinks.repository.TagRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping("/tag")
@CrossOrigin
public class TagController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TagController.class);

    @Autowired
    private TagRepository tagRepository;

    @GetMapping("/{id}")
    @ResponseBody
    public TagEntity findById(@PathVariable String id) {
        LOGGER.info("findById, id=<{}>", id);

        return tagRepository.findById(Long.parseLong(id));
    }

    @GetMapping("/all")
    @ResponseBody
    public List<TagEntity> findAll() {
        LOGGER.info("findAll");

        return tagRepository.findAll();
    }

    @PostMapping
    @ResponseBody
    public TagEntity save(@RequestBody TagEntity tagEntity) {
        LOGGER.info("save, tagEntity=<>", tagEntity);

        return tagRepository.save(tagEntity);
    }

    @PutMapping
    @ResponseBody
    public TagEntity update(@RequestBody TagEntity tagEntity) {
        LOGGER.info("update, tagEntity=<>", tagEntity);

        return tagRepository.update(tagEntity);
    }
}

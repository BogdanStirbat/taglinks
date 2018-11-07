package com.bstirbat.taglinks.taglinks.controller;

import com.bstirbat.taglinks.taglinks.entity.LinkEntity;
import com.bstirbat.taglinks.taglinks.repository.LinkRepository;
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
@RequestMapping("/link")
@CrossOrigin
public class LinkController {

    private static final Logger LOGGER = LoggerFactory.getLogger(LinkController.class);

    @Autowired
    private LinkRepository linkRepository;

    @GetMapping("/{id}")
    @ResponseBody
    public LinkEntity findById(@PathVariable String id) {
        LOGGER.info("findById, id=<{}>", id);

        return linkRepository.findById(Long.parseLong(id));
    }

    @GetMapping("/all")
    @ResponseBody
    public List<LinkEntity> findAll() {
        LOGGER.info("findAll");

        return linkRepository.findAll();
    }

    @PostMapping
    @ResponseBody
    public LinkEntity save(@RequestBody LinkEntity linkEntity) {
        LOGGER.info("save, linkEntity=<{}>", linkEntity);

        return linkRepository.save(linkEntity);
    }

    @PutMapping
    @ResponseBody
    public LinkEntity update(@RequestBody LinkEntity linkEntity) {
        LOGGER.info("update, linkEntity=<{}>", linkEntity);

        return linkRepository.update(linkEntity);
    }

}

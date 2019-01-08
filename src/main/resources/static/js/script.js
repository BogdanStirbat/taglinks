$(document).ready(function() {

    var allLinksList = [];
    var allTagsList = [];

    var selectedLinksList = [];
    var selectedTagsList = [];

    var selectedLinkId = -1;
    var selectedTagId = -1;

    loadAllLinks();
    loadAllTags();

    var add_new_tag_html = '<p>Add a new tag.</p>';
    var add_new_link_html = '<p>Add a new link.</p>';

    $(document).on("click", ".li_item", function(e) {
        e.preventDefault();
        var id = $(this).data("id");
        var url = $(this).data("url");
        var description = $(this).data("description");
        selectedLinkId = id;
        var popup = '';
        popup += '<div class="popup">';
        popup += '<div class="popup-content">';
        popup += '<p>' + url + '</p>'
        popup += '<p>' + description + '</p>'
        popup += '<button class="popup-close" data-type="link">Close</button>';
        popup += '<button class="popup-link-delete">Delete</button>';
        popup += '<div id="delete_link_error" class="error"></div>';
        popup += '</div>';
        popup += '</div>';
        loadTagsForLink(id);
        $(this).append(popup);
        add_new_tag_html = '<p>Add a new tag for this link.</p>';
        $("#new_tag").html(add_new_tag_html);
        return false;
    });

    $(document).on("click", ".li_tag", function(e) {
        var id = $(this).data("id");
        var name = $(this).data("name");
        selectedTagId = -1;
        var popup = '';
        popup += '<div class="popup">';
        popup += '<div class="popup-content">';
        popup += '<p>' + name + '</p>'
        popup += '<button class="popup-close" data-type="tag">Close</button>';
        popup += '<button class="popup-tag-delete">Delete</button>';
        popup += '<div id="delete_tag_error" class="error"></div>'
        popup += '</div>';
        popup += '</div>';
        $(this).append(popup);
        if (isALinkSelected()) {
            return false;
        }
        loadLinksForTag(id);
        add_new_link_html = '<p>Links associated with this tag.</p>';
        var notSelectedLinks = computeListOfLinksNotForCurrentTag();
        $("#new_link").html(add_new_link_html);
        return false;
    });

    $(document).on("click", ".popup-link-delete", function(e) {
        e.preventDefault();
        var initialContext = $(this);
        var id = $(this).parent().parent().parent().data("id");
        var name = $(this).parent().parent().parent().data("name");
        $.ajax({
            url: 'http://localhost:8080/link/' + id,
            type: 'DELETE',
            dataType: 'json',
            contentType: "application/json",
            success: function(data) {
                loadAllLinks();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#delete_link_error").html('<p>An error has ocurred.</p>');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });

        return false;
    });

    $(document).on("click", ".popup-tag-delete", function(e) {
        e.preventDefault();
        var initialContext = $(this);
        var tagId = $(this).parent().parent().parent().data("id");
        if (isALinkSelected()) {
            deleteLinkTag(selectedLinkId, tagId);
        } else {
            deleteTag(tagId);
        }

        return false;
    });

    function deleteTag(tagId) {
        $.ajax({
            url: 'http://localhost:8080/tag/' + tagId,
            type: 'DELETE',
            dataType: 'json',
            contentType: "application/json",
            success: function(data) {
                loadAllTags();
                loadAllLinks();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#delete_tag_error").html('<p>An error has ocurred.</p>');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

    function deleteLinkTag(linkId, tagId) {
        $.ajax({
            url: 'http://localhost:8080/linktag/link/' + linkId + '/tag/' + tagId,
            type: 'DELETE',
            dataType: 'json',
            contentType: "application/json",
            success: function(data) {
                if (isALinkSelected) {
                    $("#selectTag").remove();
                    $(".add-tag-to-list").remove();
                    loadTagsForLink(selectedLinkId);
                } else {
                    loadAllLinks();
                    loadAllTags();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

    $(document).on("click", ".popup-close", function(e) {
        e.preventDefault();
        var type = $(this).data("type");
        if (type == 'link') {
            deselectLink();
        }
        if (type == 'tag') {
            if (isALinkSelected()) {
                $(this).parent().parent().remove();
                return false;
            }
            deselectTag();
        }
        $(this).parent().parent().remove();
        return false;
    });

    $(document).on("click", "#new_link", function(e) {
        if ($(this).hasClass("selected")) {
            return false;
        }

        if (isATagSelected()) {
            return false;
        }

        $(this).addClass("selected");
        var innerHtml = '';
        innerHtml += '<div class="add_link_popup">';
        innerHtml += '<label>Url: </label>  <input name="url" id="url" type="text">';
        innerHtml += '<label>Description: </label>  <input name="description" id="description" type="text">';
        innerHtml += '<br>';
        innerHtml += '<button class="popup-new-link-close">Close</button>';
        innerHtml += '<button class="popup-new-link-add">Add</button>';
        innerHtml += '<div id="add_new_link_error" class="error"></div>'
        innerHtml += '</div>';
        $(this).html(innerHtml);

        return false;
    });

    $(document).on("click", ".popup-new-link-close", function(e) {
        resetAddNewLink($(this));
        return false;
    });

    $(document).on("click", ".popup-new-link-add", function(e) {
        var initialContext = $(this);
        var url = $("#url").val();
        var description = $("#description").val();
        if (url.length == 0) {
            $("#add_new_link_error").html('<p>Url cannot be empty!</p>');
            return false;
        }
        $.ajax({
            url: "http://localhost:8080/link",
            type: 'POST',
            data: JSON.stringify({"url": url, "description": description}),
            contentType: "application/json",
            dataType: 'json',
            success: function(data) {
                loadAllLinks();
                resetAddNewLink(initialContext);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#add_new_link_error").html('<p>An error ocurred submitting data.</p>');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
        return false;
    });

    function resetAddNewLink(domElement) {
        var innerHtml = '';
        innerHtml += '<div id="new_link">';
        innerHtml += add_new_link_html;
        innerHtml += '</div>';
        domElement.parent().parent().removeClass("selected");
        domElement.parent().html(innerHtml);
    }

    $(document).on("click", "#new_tag", function(e) {
        if ($(this).hasClass("selected")) {
            return false;
        }

        if (isALinkSelected()) {
            return false;
        }

        $(this).addClass("selected");
        var innerHtml = '';
        innerHtml += '<div class="add_tag_popup">';
        innerHtml += '<label>Name: </label>  <input name="name" id="name" type="text">';
        innerHtml += '<br>';
        innerHtml += '<button class="popup-new-tag-close">Close</button>';
        innerHtml += '<button class="popup-new-tag-add">Add</button>';
        innerHtml += '<div id="add_new_tag_error" class="error"></div>'
        innerHtml += '</div>';
        $(this).html(innerHtml);

        return false;
    });

    $(document).on("click", ".popup-new-tag-close", function(e) {
        resetAddNewTag($(this));
        return false;
    });

    $(document).on("click", ".popup-new-tag-add", function(e) {
        var initialContext = $(this);
        var name = $("#name").val();
        if (name.length == 0) {
            $("#add_new_tag_error").html('<p>Name cannot be empty!</p>');
            return false;
        }
        $.ajax({
            url: "http://localhost:8080/tag",
            type: 'POST',
            data: JSON.stringify({"name": name}),
            contentType: "application/json",
            dataType: 'json',
            success: function(data) {
                loadAllTags();
                resetAddNewTag(initialContext);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#add_new_tag_error").html('<p>An error ocurred submitting data.</p>');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
        return false;
    });

    $(document).on("click", ".add-tag-to-list", function(e) {
        var tagId = $("#selectTag").val();
        $.ajax({
            url: "http://localhost:8080/linktag",
            type: 'POST',
            data: JSON.stringify({"linkId": selectedLinkId, "tagId": tagId}),
            contentType: "application/json",
            dataType: 'json',
            success: function(data) {
                $("#new_tag").html(add_new_tag_html);
                loadTagsForLink(selectedLinkId);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#add_new_tag_error").html('<p>An error ocurred submitting data.</p>');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    });

    function resetAddNewTag(domElement) {
        var innerHtml = '';
        innerHtml += '<div id="new_tag">';
        innerHtml += add_new_tag_html;
        innerHtml += '</div>';
        domElement.parent().parent().removeClass("selected");
        domElement.parent().html(innerHtml);
    }

    function loadAllLinks() {
        $.ajax({
            url: "http://localhost:8080/link/all",
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                allLinksList = data;
                computeAndAppendHtmlForLinks(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error.');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

    function loadAllTags() {
        $.ajax({
            url: 'http://localhost:8080/tag/all',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                allTagsList = data;
                computeAndAppendHtmlForTags(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error.');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

    function loadTagsForLink(link_id) {
        $.ajax({
            url: 'http://localhost:8080/linktag/all/link/' + link_id,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                selectedTagsList = data;
                computeAndAppendHtmlForTags(data);
                appendOptionsForTagsNotForCurrentLink();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error.');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

    function loadLinksForTag(tag_id) {
        $.ajax({
            url: 'http://localhost:8080/linktag/all/tag/' + tag_id,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                selectedLinksList = data;
                computeAndAppendHtmlForLinks(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error.');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

    function computeAndAppendHtmlForLinks(links) {
        var linksHtml = '';
        links.forEach(function(link) {
            linksHtml += '<li class="li_item"' + 'data-id="' + link.id + '"data-url="' + link.url + '"data-description="' + link.description + '"> <a href="' + link.url + '">' + link.url + '</a></li>';
        });
        $('#list_links').html(linksHtml);
    }

    function computeAndAppendHtmlForTags(tags) {
        var urlsHtml = '';
        tags.forEach(function(tag) {
            urlsHtml += '<li class="li_tag"' + 'data-id="' + tag.id + '"data-name="' + tag.name + '">' + tag.name + '</li>';
        });
        $('#list_tags').html(urlsHtml);
    }

    function computeListOfTagsNotForCurrentLink() {
        var result = [];
        for (var i = 0; i < allTagsList.length; i++) {
            var tag = allTagsList[i];
            var existsInSelect = false;
            for (var j = 0; j < selectedTagsList.length; j++) {
                var selectedTag = selectedTagsList[j];
                if (tag.id == selectedTag.id) {
                    existsInSelect = true;
                    break;
                }
            }
            if (!existsInSelect) {
                result.push(tag);
            }
        }
        return result;
    }

    function appendOptionsForTagsNotForCurrentLink() {
        var notSelectedTags = computeListOfTagsNotForCurrentLink();
        var optionsHtml = '<select name="selectTag" id="selectTag">';
        for(var i = 0; i < notSelectedTags.length; i++) {
            var tag = notSelectedTags[i];
            optionsHtml += '<option value="' + tag.id + '">' + tag.name + '</option>';
        }
        optionsHtml += "</select>";
        $("#new_tag").append(optionsHtml);
        $("#new_tag").append('<button class="add-tag-to-list">Add</button>');
    }

    function computeListOfLinksNotForCurrentTag() {
        var result = [];
        for (link in allLinksList) {
            var existsInSelect = false;
            for (selectedLink in selectedLinksList) {
                if (link.id == selectedLink.id) {
                    existsInSelect = true;
                    break;
                }
            }
            if (!existsInSelect) {
                result.push(link);
            }
        }
        return result;
    }

    function deselectLink() {
        loadAllTags();
        add_new_tag_html = '<p>Add a new tag.</p>';
        $("#new_tag").html(add_new_tag_html);
    }

    function deselectTag() {
        loadAllLinks();
        add_new_link_html = '<p>Add a new link.</p>';
        $("#new_link").html(add_new_link_html);
    }

    function isATagSelected() {
        return add_new_link_html == '<p>Links associated with this tag.</p>';
    }

    function isALinkSelected() {
        return add_new_tag_html == '<p>Add a new tag for this link.</p>';
    }

});
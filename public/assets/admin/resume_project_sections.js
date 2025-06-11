$(document).ready(function () {

    function initSelect2()
    {
        // $('select[data-control="select2"]').select2('destroy');
        $('select[data-control="select2"]').select2();
    }

    // Add New User
    $(document).on("click", ".btn-add", function (e) {
        console.log("e:", e);
        $(".modal-body").html("");
        $(".drawer-title").html("Add New project");
        jQuery.getJSON(admin_url + "/resume/project-sections/add", function (response) {
            if (response.responseCode == 1) {
                $(".drawer-body").html(response.html);
                const drawerElement = document.querySelector("#kt_drawer_chat");
                if (drawerElement) {
                    KTDrawer.getInstance(drawerElement).show();
                    initSelect2();
                }
            }
        });
    });

    // Add Descriptions
    $(document).on("click", ".btn-add-descriptions", function (e) {
        console.log("e:", e);
        $(".modal-body").html("");
        var project_id = $(this).attr('data-id');
        $(".drawer-title").html("Add Project Descriptions");
        jQuery.getJSON(admin_url + "/resume/project-sections/descriptions/add/" + project_id, function (response) {
            if (response.responseCode == 1) {
                $(".drawer-body").html(response.html);
                const drawerElement = document.querySelector("#kt_drawer_chat");
                if (drawerElement) {
                    KTDrawer.getInstance(drawerElement).show();
                    initSelect2();
                }
            }
        });
    });

    // Add Images
    $(document).on("click", ".btn-add-images", function (e) {
        console.log("e:", e);
        $(".modal-body").html("");
        var project_id = $(this).attr('data-id');
        $(".drawer-title").html("Add Project Images");
        jQuery.getJSON(admin_url + "/resume/project-sections/images/add/" + project_id, function (response) {
            if (response.responseCode == 1) {
                $(".drawer-body").html(response.html);
                const drawerElement = document.querySelector("#kt_drawer_chat");
                if (drawerElement) {
                    KTDrawer.getInstance(drawerElement).show();
                    initSelect2();
                }
            }
        });
    });

    /** edit view */
    $(document).on("click", ".btn-edit", function (e) {
        $(".modal-body").html("");
        $(".drawer-title").html("Edit Existing project");
        var id = $(this).data("id");
        console.log("id:", id);
        jQuery.getJSON(admin_url + "/resume/project-sections/edit/" + id, function (response) {
            if (response.responseCode == 1) {
                $(".drawer-body").html(response.html);
                const drawerElement = document.querySelector("#kt_drawer_chat");
                if (drawerElement) {
                    KTDrawer.getInstance(drawerElement).show();
                    initSelect2();
                }
            }
        });
    });

    // Upload Supplier Company Logo
    $(document).on('change', 'input[data-type="file"]', function(event) {
        var imageUrl = URL.createObjectURL(event.target.files[0]);
        $('div[data-type="link-link-thumbnail"]').css('background-image', `url(${imageUrl})`);
    });

    // Upload Supplier Company Logo
    $(document).on('change', 'input[data-type="project-images-file"]', function(event) {
        var files = event.target.files; // Get the selected files
        // alert("Hello")
        // $("#project_section_add_images_form").submit();

    });

    $(document).on("click", ".delete-image-btn", function (e) {
        var did = $(this).attr("data-image-id");
        var currentRow = $(this).closest(".col-md-4");
        console.log("currentRow:", currentRow);
        Swal.fire({
            title: "Confirmation",
            text: "Do you want to delete this image?",
            icon: "warning",
            animation: !1,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.value) {
                if(did == 0){
                    $(currentRow).remove(); // Remove the image row after deletion
                    Swal.fire("Success", 'Project Image Deleted Successfully', "success");
                    return;
                }
                $.ajax({
                url: admin_url + "/resume/project-sections/images/delete/" + did,
                    method: "GET",
                    success: function (data) {
                        var obj = JSON.parse(data);
                        if (obj.responseCode == 1) {
                            // $(currentRow).remove();
                            Swal.fire("Success", obj.msg, "success");
                            $(currentRow).remove(); // Remove the image row after deletion
                            return;
                        } else {
                            Swal.fire("Error", obj.msg, "error");
                            return;
                        }
                    },
                });
            }
        });
    });


    // Status Change Of Project Section
    $(document).on("click", ".btn-status-change", function (e) {
        var did = $(this).data("uid");
        var currentRow = $(this).closest("td");
        console.log("currentRow:", currentRow);
        Swal.fire({
            title: "Confirmation",
            text: "You want to change project status.",
            icon: "warning",
            animation: !1,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: admin_url + "/resume/project-sections/status-change/" + did,
                    method: "GET",
                    success: function (data) {
                        var obj = JSON.parse(data);
                        if (obj.responseCode == 1) {
                            // $(currentRow).remove();
                            Swal.fire("Success", obj.msg, "success");
                            var statusBadge =
                                obj.status === 1
                                    ? '<span class="badge badge-pill badge-success">Active</span>'
                                    : '<span class="badge  badge-pill badge-danger">In-Active</span>';
                            $(currentRow).html(
                                '<a title="Change Tax Status" data-uid="' +
                                    did +
                                    '" class="btn-status-change" href="javascript:void(0)">' +
                                    statusBadge +
                                    "</a>"
                            );
                            return;
                        } else {
                            Swal.fire("Error", errMsg, "error");
                            return;
                        }
                    },
                });
            }
        });
    });

    //update status
    $(document).on('click', '.active-status, .inactive-status', function(e) {
        var status = $(this).hasClass('active-status') ? 0 : 1;
        var did = $(this).data("uid");
        var action = status == 1 ? 'Active' : 'Inactive';
        var confirmText = 'Are you sure you want to ' + action.toLowerCase() + ' this project?';
        var $badge = $(this);
        Swal.fire({
            title: 'Confirm',
            text: confirmText,
            icon: 'warning',
            animation: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, ' + action
        }).then((result) => {
            if (result.value) {

                $.ajax({
                    type: 'GET',
                    url: admin_url + "/resume/project-sections/status-change/" + did,
                    data: {
                        status: status
                    },
                    success: function(response) {

                        if (status == 1) {
                            $badge.removeClass('badge-light-danger').addClass('badge-light-success').text('Active');

                            $badge.removeClass('inactive-status').addClass('active-status');
                        } else {
                            $badge.removeClass('badge-light-success').addClass('badge-light-danger').text('Inactive');
                            $badge.removeClass('active-status').addClass('inactive-status');

                        }
                        Swal.fire(
                            'Updated!',
                            'project status has been updated.',
                            'success'
                        );
                    },
                    error: function(xhr, status, error) {
                        Swal.fire({
                            title: 'Error!',
                            text: 'An error occurred while updating the status.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                });

            }
        });
    });

    //del
    $(document).on("click", ".btn-delete", function (e) {
        var did = $(this).data("id");
        var currentRow = $(this).closest("tr");
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            animation: !1,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: admin_url + "/resume/project-sections/delete/" + did,
                    method: "GET",
                    success: function (data) {
                        var obj = JSON.parse(data);
                        if (obj.responseCode == 1) {
                            $(currentRow).remove();
                            Swal.fire("Success", obj.msg, "success");
                            return;
                        } else {
                            Swal.fire("Error", errMsg, "error");
                            return;
                        }
                    },
                });
            }
        });
    });
    //Form

    //Form Handler
    $(document).on("submit", "#fform", function (e) {
        console.log("e:", e);
        e.preventDefault();
        $("#msg_box").html("");
        $(".btn-save").attr("disabled", "disabled");
        var act_val = $("#act").val();
        var eid = $("#eid").val();
        var params = act_val;
        var dynamic_url = "/resume/project-sections/add";
        if (eid != "") {
            dynamic_url = "/resume/project-sections/" + act_val + "/" + eid;
        }
        // loadSpinner();
        $.ajax({
            url: admin_url + dynamic_url,
            type: "POST",
            data: new FormData(this),

            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                try {
                    var obj = JSON.parse(data);
                    $(".btn-save").removeAttr("disabled");
                    if (obj.responseCode == 1) {
                        $(".modal-body").html("");
                        const drawerElement =
                            document.querySelector("#kt_drawer_chat");
                        if (drawerElement) {
                            KTDrawer.getInstance(drawerElement).hide();
                        }
                        // hideSpinner();
                        Swal.fire("Success", obj.msg, "success");
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                        return;
                    } else {
                        var errMsg = "";
                        Swal.fire("Error", obj.msg, "error");
                        return;
                    }
                } catch (err) {
                    // hideSpinner();
                    $(".btn-save").removeAttr("disabled");
                    Swal.fire(
                        "Error",
                        "Oops! Something went wrong. Please refresh the page and try again. Or contact IT department." +
                            err,
                        "error"
                    );
                }
            },
        });
        return;
    });

    // Add Images Post Call
    $(document).on("submit", "#project_section_add_images_form", function (e) {
        console.log("e:", e);
        e.preventDefault();
        var project_id = $(this).attr('data-project-id');
        $("#msg_box").html("");
        $(".btn-save").attr("disabled", "disabled");
        $(".btn-save").html("Uploading...");
        var act_val = $("#act").val();
        var eid = $("#eid").val();
        var params = act_val;
        var dynamic_url = "/resume/project-sections/images/add/" + project_id;
        // loadSpinner();
        $.ajax({
            url: admin_url + dynamic_url,
            type: "POST",
            data: new FormData(this),

            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                try {
                    var obj = JSON.parse(data);
                    if (obj.responseCode == 1) {
                        $(".modal-body").html("");
                        const drawerElement =
                            document.querySelector("#kt_drawer_chat");
                        if (drawerElement) {
                            // KTDrawer.getInstance(drawerElement).hide();
                        }
                        // hideSpinner();
                        setTimeout(function () {
                            $(".btn-save").removeAttr("disabled");
                            $(".btn-save").html("Upload");
                            $('input[data-type="project-images-file"]').val('');
                            Swal.fire("Success", obj.msg, "success");
                            displayAllProjectImages(obj.data);
                        }, 2000);
                        return;
                    } else {
                        $(".btn-save").removeAttr("disabled");
                        $(".btn-save").html("Upload");
                        var errMsg = "";
                        Swal.fire("Error", obj.msg, "error");
                        return;
                    }
                } catch (err) {
                    // hideSpinner();
                    $(".btn-save").removeAttr("disabled");
                    $(".btn-save").html("Upload");
                    Swal.fire(
                        "Error",
                        "Oops! Something went wrong. Please refresh the page and try again. Or contact IT department." +
                            err,
                        "error"
                    );
                }
            },
        });
        return;
    });

    // Add Descriptions Post Call
    $(document).on("submit", "#project_section_add_descriptions_form", function (e) {
        console.log("e:", e);
        e.preventDefault();
        var project_id = $(this).attr('data-project-id');
        $("#msg_box").html("");
        $(".btn-save").attr("disabled", "disabled");
        var act_val = $("#act").val();
        var eid = $("#eid").val();
        var params = act_val;
        var dynamic_url = "/resume/project-sections/descriptions/add/" + project_id;
        // if (eid != "") {
        //     dynamic_url = "/resume/project-sections/" + act_val + "/" + eid;
        // }
        // loadSpinner();
        $.ajax({
            url: admin_url + dynamic_url,
            type: "POST",
            data: new FormData(this),

            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                try {
                    var obj = JSON.parse(data);
                    $(".btn-save").removeAttr("disabled");
                    if (obj.responseCode == 1) {
                        $(".modal-body").html("");
                        const drawerElement =
                            document.querySelector("#kt_drawer_chat");
                        if (drawerElement) {
                            KTDrawer.getInstance(drawerElement).hide();
                        }
                        // hideSpinner();
                        Swal.fire("Success", obj.msg, "success");
                        setTimeout(function () {
                            // location.reload();
                        }, 2000);
                        return;
                    } else {
                        var errMsg = "";
                        Swal.fire("Error", obj.msg, "error");
                        return;
                    }
                } catch (err) {
                    // hideSpinner();
                    $(".btn-save").removeAttr("disabled");
                    Swal.fire(
                        "Error",
                        "Oops! Something went wrong. Please refresh the page and try again. Or contact IT department." +
                            err,
                        "error"
                    );
                }
            },
        });
        return;
    });

    function displayAllProjectImages(project_images){
        $("#project_images_gallery").html("");
        for (const project_image of project_images) {
            // Get the image URL from the object
            const imageUrl = project_image.image_path;

            // Create the HTML structure for the image with a delete button
            const appendedItem = `
                <div class="col-md-4 p-1 position-relative">
                    <img src="${imageUrl}" style="object-fit: cover; width: 150px; height: 100px;" alt="Image">
                    <button class="btn btn-danger btn-sm delete-image-btn"
                            data-image-id="${project_image.id}"
                            style="position: absolute; top: 5px; right: 5px; z-index: 10;">
                        &times;
                    </button>
                </div>
            `;

            // Append the constructed HTML to the gallery container
            $("#project_images_gallery").append(appendedItem);
        }

    }


    var cVal = 1;
    $("#checkAll").click(function () {
        if (cVal == 1) {
            $("input:checkbox").prop("checked", true);
            cVal = 2;
        } else {
            $("input:checkbox").prop("checked", false);
            cVal = 1;
        }
    });

    //show
    $(document).on("click", ".btn-show", function (e) {
        $(".modal-body").html("");
        var id = $(this).data("id");
        jQuery.getJSON(admin_url + "/employee/" + id, function (response) {
            if (response.responseCode == 1) {
                $(".modal-body").html(response.html);
                $("#dodModal").modal();
            }
        });
    });

    //Display Order
    $(document).on("blur", ".display-box", function (e) {
        var id = $(this).data("did");
        var displayValue = $("#txt_" + id).val();
        jQuery.getJSON(
            admin_url + "/acl/users/do-edit/" + id + "/" + displayValue,
            function (response) {
                alert("done");
            }
        );
    });

    //Parsley Form
    $("form").parsley();
    $.listen("parsley:field:error", function () {
        var i = 0;
        $("#sform .form-control").each(function (k, e) {
            var field = $(e).data("err");
            $(e)
                .next("ul")
                .find("li:eq(" + i + ")")
                .html(field + " field is required");
        });
    });


    /** Team Assignment  */
       // Add New User
    $(document).on("click", ".btn-add-team", function (e) {
        console.log("e:", e);
        $(".modal-body").html("");
        $(".drawer-title").html("Assign New Team");
        jQuery.getJSON(admin_url + "/team/add", function (response) {
            if (response.responseCode == 1) {
                $(".drawer-body").html(response.html);
                const drawerElement = document.querySelector("#kt_drawer_chat");
                if (drawerElement) {
                    KTDrawer.getInstance(drawerElement).show();
                }
            }
        });
    });

    /** Team Save */

    //Form Handler
    $(document).on("submit", "#teamform", function (e) {

        e.preventDefault();

        var employeesIDs = [];
        $('.checkbox:checked').each(function() {
            employeesIDs.push($(this).val());
        });
        if (employeesIDs.length === 0) {
            Swal.fire("Error", 'Please choose any employee for team assignment', "error");
            return;
          }
        $("#msg_box").html("");
        $(".btn-save").attr("disabled", "disabled");
        var act_val = $("#act").val();
        var eid = $("#eid").val();
        var params = act_val;

        if (eid != "") {
            params = act_val + "/" + eid;
        }
        var data =  new FormData(this);
        data.append('employeesIDs', employeesIDs);


        // loadSpinner();
        $.ajax({
            url: admin_url + "/team/" + params,
            type: "POST",
            data: data,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                try {
                    var obj = JSON.parse(data);
                    console.log('obj:', obj)
                    console.log('responseCode:', obj.responseCode)

                    if (obj.responseCode == 1) {
                        $(".modal-body").html("");
                        const drawerElement =
                            document.querySelector("#kt_drawer_chat");
                        if (drawerElement) {
                            KTDrawer.getInstance(drawerElement).hide();
                        }
                        // hideSpinner();
                        Swal.fire("Success", obj.msg, "success");
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                        return;
                    } else {
                        // hideSpinner();
                        var errMsg = "";
                        $(".btn_submit").removeAttr("disabled");
                        if (typeof obj.msg === "object") {
                            $.each(obj.msg, function (index, value) {
                                errMsg = errMsg + value + "\r\n";
                            });
                        } else {
                            errMsg = obj.msg;
                        }
                        Swal.fire("Error", errMsg, "error");
                        return;
                    }
                } catch (err) {
                    // hideSpinner();
                    Swal.fire(
                        "Error",
                        "Oops! Something went wrong. Please refresh the page and try again. Or contact IT department." +
                            err,
                        "error"
                    );
                }
            },
        });
        return;
    });
});

function showEntities(val) {
    if (val == "custom") {
        $("#elist").css("display", "block");
    } else {
        $("#elist").css("display", "none");
    }
}

function showPasswordField(val) {
    if (val == "1") {
        $("#passfield").css("display", "none");
    } else {
        $("#passfield").css("display", "block");
    }
}

$(document).ready(function () {

    var table = $('#datatableusr').DataTable({
        info: false,
        order: [],
        pageLength: 50,
        lengthChange: false,
        columnDefs: [{
            orderable: false
        }, {
            orderable: false
        }]
    });

    document.querySelector('[data-user-listing-table-filter="search"]').addEventListener("keyup", function (t) {
        table.search(t.target.value).draw();
    });


});

$(document).on('input', '.number_input_only', function(){
    // Remove any non-numeric characters
    this.value = this.value.replace(/[^0-9]/g, '');
})

$(document).on('blur', '.sort_number_input', function(){
    var sort_number = $(this).val();
    var row_id = $(this).attr('data-project-id');
    $.ajax({
        url: admin_url + "/resume/project-sections/sorting/" + row_id + "/" + sort_number,
        method: "GET",
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.responseCode == 1) {
                $(currentRow).remove();
                Swal.fire("Success", obj.msg, "success");
                return;
            } else {
                Swal.fire("Error", errMsg, "error");
                return;
            }
        },
    });
})

$(document).ready(() => {
    // Load regions into select dropdown
    loadRegions();


    $("#country-table").DataTable({
        ajax: {
            url: "api/country",
            dataSrc: "",
        },
        columns: [{
                data: null,
                render: (data, type, row, meta) => {
                    return meta.row + 1;
                },
            },
            { data: "code" },
            { data: "name" },
            { data: "region.name" },
            {
                data: null,
                render: function(data, type, row, meta) {
                    return `
                <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#detail"
                    onclick="getDetail(${data.id})"
                  >
                    Detail
                </button>
                <button
                    type="button"
                    class="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#update"
                    onclick="getUpdate(${data.id})"
                >
                    Update
                </button>
                <button
                    type="button"
                    class="btn btn-danger"
                    onclick="confirmDelete(${data.id})"
                >
                    Delete
                </button>
            `;
                },
            },
        ],
    });
});

function getDetail(id) {
    $.ajax({
        method: "GET",
        url: "api/country/" + id,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
            $("#detail-code").val(res.code);
            $("#detail-name").val(res.name);
            $("#detail-region").val(res.region.name); // Akses properti name dari region
            $("#detailModal").modal("show"); // Tampilkan modal detail
        },
    });
}

function createCountry() {
    let codeVal = $("#create-code").val();
    let nameVal = $("#create-name").val();
    let regionId = $("#create-region").val();

    $.ajax({
        method: "POST",
        url: "/api/country",
        dataType: "JSON",
        contentType: "application/json",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
            code: codeVal,
            name: nameVal,
            region: { id: regionId },
        }),
        success: (res) => {
            $("#create").modal("hide");
            $("#country-table").DataTable().ajax.reload();
            $("#update-id").val("");
            $("#update-code").val("");
            $("#update-name").val("");
            $("#update-region").val("");
        },
    });
}


function loadRegions() {
    $.ajax({
        method: "GET",
        url: "api/region",
        dataType: "JSON",
        success: (res) => {
            const selectElement = $("#create-region");
            selectElement.empty();

            res.forEach((region) => {
                const option = `<option value="${region.id}">${region.name}</option>`;
                selectElement.append(option);
            });

            // Populate regions in the update modal as well
            const updateSelectElement = $("#update-region");
            updateSelectElement.empty();

            res.forEach((region) => {
                const option = `<option value="${region.id}">${region.name}</option>`;
                updateSelectElement.append(option);
            });
        },
    });
}


function getUpdate(id) {
    $.ajax({
        method: "GET",
        url: "api/country/" + id,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
            $("#update-id").val(res.id);
            $("#update-code").val(res.code);
            $("#update-name").val(res.name);
            $("#update-region").val(res.region.id); // Akses properti name dari region
            $("#update").modal("show"); // Tampilkan modal detail
        },
    });
}


updateCountry = () => {
    let id = $("#update-id").val()
    let code = $("#update-code").val();
    let name = $("#update-name").val();
    let regionId = $("#update-region").val();
    $.ajax({
        method: "PUT",
        url: "api/country/" + id,
        dataType: "JSON",
        contentType: "application/json",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
            code: code,
            name: name,
            region: { id: regionId }
        }),
        success: (res) => {
            $("#update").modal("hide");
            $("#country-table").DataTable().ajax.reload();
            $("#update-id").val("");
            $("#update-code").val("");
            $("#update-name").val("");
            $("#update-region").val("");
        },
    });

};



let countryIdToDelete;

function confirmDelete(id) {
    countryIdToDelete = id;
    $('#delete').modal('show');
}

function deleteCountry() {
    $.ajax({
        method: 'DELETE',
        url: 'api/country/' + countryIdToDelete,
        success: function() {
            $('#delete').modal('hide');
            $('#country-table').DataTable().ajax.reload();
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error(xhr.responseText);
            // Handle error
        }
    });
};

function logout() {
    Swal.fire({
        title: 'Are you sure want to logout this page?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "POST",
                url: "logout",
                dataType: "JSON",
                beforeSend: addCsrfToken()
            });
            window.location = "http://localhost:9001/login"
        }
    })
}
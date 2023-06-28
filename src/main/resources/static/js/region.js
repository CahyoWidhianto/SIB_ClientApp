$("#region-table").DataTable({
    ajax: {
        url: "api/region",
        dataSrc: "",
    },
    columns: [{
            data: "null",
            render: (data, type, row, meta) => {
                return meta.row + 1;
            },
        },
        {
            data: "name"
        },
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

function getDetail(id) {
    $.ajax({
        method: "GET",
        url: "api/region/" + id,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
            $("#detail-name").val(res.name);
        },
    });
}



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

createRegion = () => {
    let nameVal = $("#create-name").val();

    $.ajax({
        method: "POST",
        url: "api/region",
        dataType: "JSON",
        contentType: "application/json",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
            name: nameVal,
        }),
        success: (res) => {
            $("#create").modal("hide");
            $("#region-table").DataTable().ajax.reload();
            $("#update-id").val("");
            $("#update-name").val("");
        },
    });
};

function getUpdate(id) {
    $.ajax({
        method: "GET",
        url: "api/region/" + id,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
            $("#update-id").val(res.id);
            $("#update-name").val(res.name);
        },
    });
}

updateRegion = () => {
    let idVal = $("#update-id").val();
    let nameVal = $("#update-name").val();

    $.ajax({
        method: "PUT",
        url: "api/region/" + idVal,
        dataType: "JSON",
        contentType: "application/json",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
            id: idVal,
            name: nameVal,
        }),
        success: (res) => {
            $("#update").modal("hide");
            $("#region-table").DataTable().ajax.reload();
            $("#update-id").val("");
            $("#update-name").val("");
        },
    });
};

let regionIdToDelete;

function confirmDelete(id) {
    regionIdToDelete = id;
    $('#delete').modal('show');
}

function deleteRegion() {
    $.ajax({
        method: 'DELETE',
        url: 'api/region/' + regionIdToDelete,
        success: function() {
            $('#delete').modal('hide');
            $('#region-table').DataTable().ajax.reload();
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error(xhr.responseText);
            // Handle error
        }
    });
};
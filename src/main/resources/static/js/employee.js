$("#employee-table").DataTable({
    ajax: {
        url: "api/employee",
        dataSrc: "",
    },
    columns: [{
            data: null,
            render: (data, type, row, meta) => {
                return meta.row + 1;
            },
        },
        {
            data: "name"
        },
        {
            data: "email"
        },
        {
            data: "phone",
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
        url: "api/employee/" + id,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
            $("#detail-name").val(res.name);
            $("#detail-email").val(res.email);
            $("#detail-phone").val(res.phone);
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

function createEmployee() {
    let emailVal = $("#create-email").val();
    let nameVal = $("#create-name").val();
    let phoneVal = $("#create-phone").val();

    $.ajax({
        method: "POST",
        url: "/api/employee/",
        dataType: "json",
        contentType: "application/json",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
            email: emailVal,
            name: nameVal,
            phone: phoneVal
        }),
        success: (res) => {
            $("#create").modal("hide");
            $("#employee-table").DataTable().ajax.reload();
        },
    });
}

function getUpdate(id) {
    $.ajax({
        method: "GET",
        url: "api/employee/" + id,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
            $("#update-id").val(res.id);
            $("#update-name").val(res.name);
            $("#update-email").val(res.email);
            $("#update-phone").val(res.phone);
            $("#update").modal("show");
        },
    });
}

updateEmployee = () => {
    let idVal = $("#update-id").val();
    let nameVal = $("#update-name").val();
    let emailVal = $("#update-email").val();
    let phoneVal = $("#update-phone").val();

    $.ajax({
        method: "PUT",
        url: "api/employee/" + idVal,
        dataType: "JSON",
        contentType: "application/json",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
            id: idVal,
            name: nameVal,
            email: emailVal,
            phone: phoneVal
        }),
        success: (res) => {
            $("#update").modal("hide");
            $("#employee-table").DataTable().ajax.reload();
        },
    });
};

let employeeIdToDelete;

function confirmDelete(id) {
    employeeIdToDelete = id;
    $('#delete').modal('show');
}

function deleteEmployee() {
    $.ajax({
        method: 'DELETE',
        url: 'api/employee/' + employeeIdToDelete,
        beforeSend: addCsrfToken(),
        success: function() {
            $('#delete').modal('hide');
            $('#region-table').DataTable().ajax.reload();
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error(xhr.responseText);
        }
    });
};
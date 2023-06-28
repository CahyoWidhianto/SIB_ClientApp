$("#user-table").DataTable({
    ajax: {
        url: "/api/user",
        dataSrc: "",
    },
    columns: [{
            data: "null",
            render: (data, type, row, meta) => {
                return meta.row + 1;
            },
        },
        {
            data: "username"
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
        url: "api/user/" + id,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
            $("#detail-username").val(res.username);
            $("#detail-isEnabled").val(res.isEnabled);
            $("#detail-isAccountNonLocked").val(res.isAccountNonLocked);
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

createUser = () => {
    let nameVal = $("#create-name").val();
    let usernameVal = $("#create-username").val();
    let emailVal = $("#create-email").val();
    let phoneVal = $("#create-phone").val();
    let passwordVal = $("#create-password").val();

    $.ajax({
        method: "POST",
        url: "api/user",
        dataType: "JSON",
        contentType: "application/json",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
            name: nameVal,
            username: usernameVal,
            email: emailVal,
            phone: phoneVal,
            password: passwordVal
        }),
        success: (res) => {
            $("#create").modal("hide");
            $("#role-table").DataTable().ajax.reload();
            $("#create-id").val("");
            $("#create-username").val("");
        },
    });
};


function getUpdate(id) {
    $.ajax({
        method: "GET",
        url: "api/user/" + id,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
            $("#update-id").val(res.id);
            $("#update-username").val(res.username);
            $("#update-password").val();
        },
    });
}

updateUser = () => {
    let idVal = $("#update-id").val();
    let usernameVal = $("#update-username").val();
    let passwordVal = $("#update-password").val();

    $.ajax({
        method: "PUT",
        url: "api/user/" + idVal,
        dataType: "JSON",
        contentType: "application/json",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
            id: idVal,
            username: usernameVal,
            password: passwordVal
        }),
        success: (res) => {
            $("#update").modal("hide");
            $("#role-table").DataTable().ajax.reload();
            $("#update-id").val("");
            $("#update-name").val("");
        },
    });
};


// let userIdToDelete;

// function confirmDelete(id) {
//     userIdToDelete = id;
//     $('#delete').modal('show');
// }

// function deleteUser() {
//     $.ajax({
//         method: 'DELETE',
//         url: 'api/user/' + userIdToDelete,
//         beforeSend: addCsrfToken(),
//         success: function() {
//             $('#delete').modal('hide');
//             $('#role-table').DataTable().ajax.reload();
//         },
//         error: function(xhr, textStatus, errorThrown) {
//             console.error(xhr.responseText);
//             // Handle error
//         }
//     });
// };
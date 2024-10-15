let items = [];
let currentTask = null;

let addDialog = $('#dialog-add').dialog({
    resizable: false,
    autoOpen: false,
    width: 400,
    height: 200,
    title: 'Add item',
    modal: true,
    buttons: {
        'Add Item': function() {
            let item = $('#item').val();
            if (item) {
                addItem(item);
                $('#item').val('');
                $(this).dialog('close');
            }
        },
        'Cancel': function() {
            $(this).dialog('close');
        }
    }
});

let editDialog = $('#dialog-edit').dialog({
    resizable: false,
    autoOpen: false,
    width: 400,
    height: 200,
    title: 'Edit item',
    modal: true,
    buttons: {
        'Edit Item': function() {
            let newItem = $('#new-item').val();
            if (newItem) {
                editItem(newItem);
                $('#new-item').val('');
                $(this).dialog('close');
            }
        },
        'Cancel': function() {
            $(this).dialog('close');
        }
    }
});

let deleteDialog = $('#dialog-delete').dialog({
    resizable: false,
    autoOpen: false,
    width: 400,
    height: 200,
    title: 'Delete item',
    modal: true,
    buttons: {
        'Delete': function() {
            deleteItem();
            $(this).dialog('close');
        },
        'Cancel': function() {
            $(this).dialog('close');
        }
    }
});


$('#add').on('click', function() {
    addDialog.dialog('open');
});

function addItem(item) {
    let task = $('<li class="task"></li>');
    let taskText = $('<p class="task-text">' + item + '</p>');
    let editButton = $('<button class="edit button">Edit</button>').on('click', () => {
        currentTask = task;
        editDialog.dialog('open');
    });
    let deleteButton = $('<button class="delete button">Delete</button>').on('click', () => {
        currentTask = task;
        deleteDialog.dialog('open');
    });
    task.append(taskText, editButton, deleteButton);
    $('#list').append(task);
}

function editItem(newItem) {
    currentTask.find('p').text(newItem);
}

function deleteItem() {
    currentTask.remove();
}
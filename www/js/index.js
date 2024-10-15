let items = [];
let currentTask = null;

let addDialog = $('#dialog-add').dialog({
    resizable: false,
    autoOpen: false,
    width: 400,
    height: 200,
    title: 'Add item',
    modal: true,
    open: function() {
        $('#item').val('');
        $('#item').focus();
        $(this).addClass('ui-dialog-content-focus');
    },
    buttons: {
        'Add Item': function() {
            let item = $('#item').val();
            if (item) {
                addItem(item);
                items.push(item);
                $('#item').val('');
                $(this).dialog('close');
                saveTaskList();
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
    let index = items.indexOf(currentTask.find('p').text());
    currentTask.find('p').text(newItem);
    items[index] = newItem;
    saveTaskList();
}

function deleteItem() {
    let index = items.indexOf(currentTask.find('p').text());
    currentTask.remove();
    items.splice(index, 1);
    saveTaskList();
}

function saveTaskList() {
    const jsonString = JSON.stringify(items); // Convert array to JSON string
    localStorage.setItem('taskList', jsonString); // Save JSON string to localStorage
}

// Function to load the array from localStorage
function loadTaskList() {
    const jsonString = localStorage.getItem('taskList'); // Get JSON string from localStorage
    return jsonString ? JSON.parse(jsonString) : []; // Convert back to array or return empty array
}

function loadTaskListUI() {
    items = loadTaskList();
    console.log(items);
    for (let item of items) {
        addItem(item);
    }
}

loadTaskListUI();
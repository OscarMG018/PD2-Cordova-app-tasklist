let items = [];

$('#dialog').hide();

$('#add').on('click', () => {
    let item = prompt('Enter item');
    addItem(item);
});

function addItem(item) {
    let task = $('<div class="task"><p>' + item + '</p></div>');
    $('#list').append(task);

}
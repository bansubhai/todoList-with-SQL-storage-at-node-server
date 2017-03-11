/**
 * Created by pawan on 29/1/17.
 */

function getTodos() {

    $.get('todos/get', function (data) {
        let list = '';

        for (todo of data) {
            list += "<li data-todoid='" + todo.id + "' class='"+ (todo.done ? "done" : "")+"'>" +
                "<input type='checkbox' " + (todo.done ? "checked" : "") + ">" +
                "<span style='text-decoration: " + (todo.done ? "line-through" : "") + "'>" + todo.task + "</span>" +
                "<button type='button' class='xBtn'>X</button>" +
                "</li>";
        }

        $('#todolist').html(list);
    })

}

function doTodo() {
    console.log('inside Do todo');
    // console.log(this);
    var todoLI = $($(this).parent()[0]);
    var todoid = todoLI.attr('data-todoid')
    $.post('todos/done', {id: todoid}, function (data) {
        console.log(data);
    });
    strikeToggle(todoLI.children("span"));
    todoLI.toggleClass('done');

    let checkBox= todoLI.children('[type=checkbox]');
    // console.log(checkBox);
    if(todoLI.hasClass('done')){
        checkBox.prop('checked', true);
    }
    else{
        checkBox.prop('checked', false);
    }
}

function strikeToggle(el) {
    if (el.css('textDecoration') == 'line-through') {
        el.css('textDecoration', "");
    }
    else {
        el.css('textDecoration', "line-through");
    }
}

function removeTodo() {
    console.log('insode remove todo');
    var todoLI = $($(this).parent()[0]);
    var todoid = todoLI.attr('data-todoid')
    $.post('todos/remove', {id: todoid}, function (data) {
        console.log(data);
        getTodos();
    });
}

$(function () {
    getTodos();

    $('#addtodo').click(function () {
        let todoBox = $('#newtodo');
        $.get('todos/add?todo=' + todoBox.val(), function (data) {
            console.log(data);
            getTodos();
            todoBox.val("");
            todoBox.focus();
        })
    })

    $('#cleartodo').click(function () {
        $.get('todos/clear', function (data) {
            console.log(data);
            getTodos();
        })
    })

    $('#todolist').on('click', 'li *:not(".xBtn")', doTodo);
    $('#todolist').on('click', '.xBtn', removeTodo);

})

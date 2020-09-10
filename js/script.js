// Completare l’esercizio iniziato a lezione sulla todo-list.
// Utilizzare l’API di esempio http://157.230.17.132:xxxx
// e fare le 4 operazioni Create, Read, Update e Delete.
$(document).ready(function(){
    getElement();
    $(document).on('click','span.delete',function(){
        var elemento = $(this);
        var idToDo = elemento.parent().attr('data-id');
        deleteElement(idToDo);
    });

    $(.'inserisci').click(function(){
        var newElement = ('#nuova-voce').val();
        createElement(newElement);
    });

    $(document).on('click','span.testo',function(){
        var elemento = $(this);
        $('.testo').removeClass('hidden');
        elemento.addClass('hidden');

        $('.testo').next().addClass('hidden');
        elemento.next().removeClass('hidden');
    });

    $(document).on('keydown','input-add',function(){
        var idNewElement = $(this).parent().attr('data-id');
        if(event.which == 13 || event.keyCode == 13){
            var newElement = $(this).val();
            updateElement(idNewElement,newElement);
        }
    });
})

// FUNZIONI
function getElement(RicercaElemento){
    $.ajax({
        url: 'http://157.230.17.132:3003/todos',
        method: 'Get',
        success: function(data){
            var source = $("#entry-template").html();
            var template = Handlebars.compile(source);

            for (var i = 0; i < data.length ; i++) {
                var context = {
                    text: data[i].text,
                    id: data[i].id
                }
                console.log(context);
                var html = template(context);
                $('.todos').append(html);
            }

        },
        error: function(){
            alert('Errore');
        }
    });
}

function deleteElement(id){
    $.ajax({
        url: 'http://157.230.17.132:3003/todos' + id,
        method: 'DELETE',
        success: function(risposta){
            $('.todos').html('');
            getData();
        },
        error: function(){
            alert('Errore');
        }
    });
}

function updateElement(id,elemento){
    $.ajax({
        url: 'http://157.230.17.132:3003/todos' + id,
        method: 'PUT',
        data: {
            text: elemento
        },
        success: function(risposta){
            $('.todos').html('');
            getData();
        },
        error: function(){
            alert('Errore');
        }
    });
}

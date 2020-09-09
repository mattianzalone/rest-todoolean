// Completare l’esercizio iniziato a lezione sulla todo-list.
// Utilizzare l’API di esempio http://157.230.17.132:xxxx
// e fare le 4 operazioni Create, Read, Update e Delete.
$(document).ready(function(){
    getElement();
    $(document).on('click','span.delete',function(){
        var elemento = $(this);
        var toDoElement = elemento.parent().attr('data-id');
        console.log(toDoElement);
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

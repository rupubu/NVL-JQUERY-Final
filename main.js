$(document).ready(function () {
    var hoverCell = "";
    var veces = -1;
    var a = 0;
    var lineaganadora = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ], [ 1, 5, 9 ], [ 3, 5, 7 ] ];

    
    $("div").first().append('<a class="btn big">Reset</a>');
    $("td").append("<img class='oculto' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>");
    $("td").attr("txt", "");

    $("td").on({
        "click": selecciona,
        "mouseenter": conFoco,
        "mouseleave": sinFoco});
    $("body").keydown(buscaCelda);
    $(".btn").click(reset);
    

    function conFoco() {
        $( hoverCell ).removeClass("hover");
        $(this).addClass("hover");
        hoverCell = this;
    }

    function sinFoco() {
        $(this).removeClass("hover");
    }


    function valor() {
        var val, valAnt, valTxt;

        veces++;
        if (veces % 2 === 0) {
            valTxt = "X";
            val = "IMG/X.png";
        }
        else {
            valTxt = "O";
            val = "IMG/O.png";
        }
        
        if ( veces > 0 && hoverCell !== "" ) {
            valAnt = $(hoverCell).attr("txt");
            if (valAnt !== undefined && valAnt !== "") {
                if (valAnt !== valTxt) {
                     if (!confirm("La casilla actual contiene un valor distinto. ¿Quieres cambiarlo?")) {
                        valTxt = $(hoverCell).attr("txt");
                        val = $(hoverCell).children("img").attr("src");
                        veces--;
                     }
                }
            }
        }
        $(hoverCell).attr("txt", valTxt);
        return val;
        
    }

    function selecciona (e) {
        var valores;
        var linea;

        if (e.target.htmlTag = "td") {
            hoverCell = this;
        }

        //Asigna Valor
        $(hoverCell).children("img").removeClass("oculto");
        $(hoverCell).children("img").addClass("visible");
        $(hoverCell).children("img").attr("src",valor()).show(1000);

        if (veces > 3) { //Si se han puesto al menos 4 marcas, se comprueba si se ha ganado.
            valores = $("td");

            for (var i = 0; i < 8; i++) {
                linea = $("td[pos='" + lineaganadora[i][0] + "']").attr("txt") + $("td[pos='" + lineaganadora[i][1] + "']").attr("txt") + $("td[pos='" + lineaganadora[i][2] + "']").attr("txt");
                if (linea === "XXX" || linea === "OOO"){
                    $("td").off("click");
                    //Si que quito el evento al acertar y lo pongo al resetear, entra en bucle al resetear (No lo endiendo)
                     do {
                         $("td[pos='" + lineaganadora[i][0] + "']").children("img").fadeOut( 800 ).fadeIn( 800 );
                         $("td[pos='" + lineaganadora[i][1] + "']").children("img").fadeOut( 800 ).fadeIn( 800 );
                         // No se porque no funciona la funcion en la misma linea.
                         //$("td[pos='" + lineaganadora[i][2] + "']").children("img").fadeOut( 800 ).fadeIn( 800, function() {a++;});
                         $("td[pos='" + lineaganadora[i][2] + "']").children("img").fadeOut( 800 ).fadeIn( 800, suma());
                     } while ( a < 3)
                     $("table").fadeOut(5000 , function () {
                        $("#cartel").removeClass("oculta");
                        $("#cartel").addClass("cartelVisible").fadeIn(1000).slideUp(1500).slideDown(1500).fadeOut(1500).toggle(1000);
                        $("#cartel p").text("¡¡¡ Enhorabuena has ganado !!!");
                    });
                    break;
                }
            }
            if (veces === 8 && i === 8) {
                $("table").toggle(5000 , function () {  
                    $("#cartel").removeClass("oculta");
                    $("#cartel").addClass("cartelVisible");
                    $("#cartel").addClass("cartelVisible").fadeIn(1000).slideUp(1500).slideDown(1500);
                    $("#cartel p").text("¡¡¡ Empate !!!");
                });
            }
        }
    }

    function suma() {
        a++;
    }

    function buscaCelda(e) {
        if (hoverCell !== "" ) {
            switch (e.which) {
                case 32: // Espacio
                     $( hoverCell ).trigger("click");
                     break;
                case 37:  // Fecha izquierda
                    if ($( hoverCell ).prev().length > 0) {
                        $( hoverCell ).trigger("mouseleave");
                        hoverCell = $( hoverCell ).prev().trigger("mouseenter")[0];
                    }
                    else {
                        $( hoverCell ).trigger("mouseleave");
                        hoverCell = $ ( hoverCell ).nextAll().last().trigger("mouseenter")[0];
                    }
                break;
                case 38:  // Fecha arriba
                    if ($( hoverCell ).closest("tr").prev().length > 0) {
                        $( hoverCell ).trigger("mouseleave");
                        hoverCell = $( hoverCell ).closest("tr").prev().children("td").eq([hoverCell.cellIndex]).trigger("mouseenter")[0];
                    }
                    else {
                        $( hoverCell ).trigger("mouseleave");
                        hoverCell = $ ( hoverCell ).closest("tr").nextAll().last().children("td").eq([hoverCell.cellIndex]).trigger("mouseenter")[0];
                    }
                break;
                case 39:  // Fecha derecha
                    if ($ ( hoverCell ).next().length > 0) {
                        $( hoverCell ).trigger("mouseleave");
                        hoverCell = $ ( hoverCell ).next().trigger("mouseenter")[0];
                    }
                    else {
                        $( hoverCell ).trigger("mouseleave");
                        hoverCell = $ ( hoverCell ).prevAll().last().trigger("mouseenter")[0];
                    }
                break;
                case 40:  // Fecha abajo
                    if ($( hoverCell ).closest("tr").next().length > 0) {
                        $( hoverCell ).trigger("mouseleave");
                        hoverCell = $( hoverCell ).closest("tr").next().children("td").eq([hoverCell.cellIndex]).trigger("mouseenter")[0];
                    }
                    else {
                        $( hoverCell ).trigger("mouseleave");
                        hoverCell = $ ( hoverCell ).closest("tr").prevAll().last().children("td").eq([hoverCell.cellIndex]).trigger("mouseenter")[0];
                    }
                    break;
                default:
            }
        }
    }

    function reset() {
        hoverCell = "";
        veces = -1;
        a = 0;
        
        $("td img").stop();
        $("td").attr("txt","");
        $("td img").fadeOut( 2000 , terminaReset);
    }

    function terminaReset()
    {
        $("td img").removeClass("visble");
        $("td img").addClass("oculto").attr("scr", "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
        
        //$("td").on("click", selecciona);
        //Si que quito el evento al acertar y lo pongo al resetear, entra en bucle al resetear (No lo endiendo)

        // Reinicio la pagina
        location.reload();
    }



   





});
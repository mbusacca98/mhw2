//Event Listener
document.addEventListener("DOMContentLoaded", function(event) { 
    riempiSaloni();

    document.querySelector('.all .search input').addEventListener("keyup", searchAllSaloni);
    document.querySelector('.header_mobile .fas').addEventListener("click", openMenu);
    document.querySelector('.close i').addEventListener("click", closeMenu);
});

function dettagli(event){
    var parent = event.target.parentElement.parentElement.parentElement;

    parent.querySelector("#title").classList.toggle("hidden");
    parent.querySelector("#desc").classList.toggle("hidden");    
}

function riempiSaloni(){
    var i = 0;

    saloni.forEach(element => {
        var template = document.querySelector("#template_allSaloni");
        var el;
        var i = 0;
        template = template.content.cloneNode(true);

        var p = template.querySelectorAll(".nome_salone");
        p.forEach(elements => {
            elements.textContent = element.nome;
        });
        
        p = template.querySelector("#citta");
        p.textContent = element.citta;

        p = template.querySelector("#indirizzo");
        p.textContent = element.indirizzo;

        p = template.querySelector("#servizi");
        el = element.servizi;
        i = 0;
        el.forEach(item => {
            if(i > 0){
                p.textContent += ", ";
            }
            p.textContent += item;
            i++;
        });

        p = template.querySelector("#sesso");
        el = element.sesso;
        i = 0;
        el.forEach(item => {
            if(i > 0){
                p.textContent += ", ";
            }
            p.textContent += item;
            i++;
        });

        var arrayElement = template.querySelectorAll(".button-desc");
        arrayElement.forEach(element => {
            element.addEventListener("click", dettagli);
        });

        arrayElement = template.querySelectorAll(".preferito");
        arrayElement.forEach(element => {
            element.addEventListener("click", addPreferito);
        });

        template.querySelector('.div_salone').dataset.id = i;
        template.querySelector('.preferito').dataset.id = i;

        template.querySelector(".div_salone").style.backgroundImage = "url('" + element.img + "')" ;

        document.querySelector(".body_all_saloni").appendChild(template);

        i++;
    });
}

function searchAllSaloni(){
    var text = document.querySelector('.all .search input').value;
    
    if(text != ''){
        var arrayDiv = document.querySelectorAll(".body_all_saloni > .div_salone");

        arrayDiv.forEach(element => {
            var nome = element.querySelector("#nome_salone").textContent;

            if(nome.toLowerCase().search(text.toLowerCase()) == -1){
                element.classList.add('hidden');
            } else{
                element.classList.remove('hidden');
            }
        });
    } else{
        var arrayDiv = document.querySelectorAll(".body_all_saloni > .div_salone");

        arrayDiv.forEach(element => {
            element.classList.remove('hidden');
        }); 
    }
}

function addPreferito(event){
    var dataPref = event.target.dataset.preferito;
    var id = event.target.dataset.id;

    if(dataPref == 'false'){
        event.target.dataset.preferito = 'true';
        
        var template = document.querySelector(".div_salone[data-id='"+id+"']").cloneNode(true);
        var clone = template.cloneNode(true);

        var arrayElement = clone.querySelectorAll(".button-desc");
        arrayElement.forEach(element => {
            element.addEventListener("click", dettagli);
        });

        document.querySelector('.body_preferiti').appendChild(clone);
    } else if(dataPref == 'true'){
        event.target.dataset.preferito = 'false';
        var id = event.target.dataset.id;

        document.querySelector(".body_preferiti .div_salone[data-id='"+id+"']").remove();
    }
}

function openMenu(){
    document.querySelector('header').style.display = "flex";
}

function closeMenu(){
    document.querySelector('header').style.display = "none";
}
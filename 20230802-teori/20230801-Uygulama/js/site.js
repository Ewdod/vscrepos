const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

let notlar = [
    {
        baslik: "Alışveriş Listesi",
        icerik: "Süt, ekmek, yumurta, meyve almayı unutma."
    },
    {
        baslik: "Toplantı Hatırlatması",
        icerik: "Yarın saat 10:00'da müdürle toplantı var."
    },
    {
        baslik: "Film Önerileri",
        icerik: "The Shawshank Redemption, Inception, Interstellar izlemeyi düşün."
    },
    {
        baslik: "Doğum Günü Hediyesi",
        icerik: "Anne için doğum gününde çiçek veya kitap almayı planla."
    }
];

function listele() {
    for (const not of notlar) {
        $("<a/>")
            .prop("not", not)
            .click(baslikTiklandi)
            .attr("href", "#")
            .text(not.baslik)
            .addClass("list-group-item list-group-item-action")
            .appendTo("#lstNotlar");
    }
}

function baslikTiklandi(e) {
    e.preventDefault();
    let not = $(this).prop("not");
    $("#lstNotlar>a").removeClass("active");
    $(this).addClass("active");
    $("#txtBaslik").val(not.baslik);
    $("#txtIcerik").val(not.icerik);
}

listele();

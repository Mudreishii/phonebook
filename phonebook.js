$(document).ready(function () {

    var contacts = [{
        firstName: "Дима",
        lastName: "Белов",
        operator: "063",
        phoneNumber: "0631346611"
    }, {
        firstName: "Александр",
        lastName: "Соловей",
        operator: "067",
        phoneNumber: "911"
    }];

    var pokazForm = 0; // Счётчик открытия и закрытия формы

    // Добовление контакта
    add({
        firstName: "John",
        lastName: "Resiz",
        operator: "066",
        phoneNumber: "098239146"
    });

    function add(newContact) {
        contacts.push(newContact);
    }

    // Вывод контактов
    function showContacts() {
        $('.table-contacts .table tbody').find($('tr')).remove();
        $.each(contacts, function (index, contact) {

            var blockKnopok = $("<div>");
            var buttonEdit = $("<button class='btn btn-success success'>").text('Edit');
            var buttonDelit = $("<button class='btn btn-danger danger' style='margin-left:5px'>").text('Delete');
            blockKnopok.append(buttonEdit);
            blockKnopok.append(buttonDelit);

            var tr = $("<tr>").data("id",contact.phoneNumber);
            var tdFirstName = $("<td>").text(contact.firstName);
            var tdLastName = $("<td>").text(contact.lastName);
            var tdOperator = $("<td>").text(contact.operator);
            // var tdPhoneNumber = $("<td>").addClass("tdPhon").text(contact.phoneNumber);
            var tdPhoneNumber = $("<td>").text(contact.phoneNumber);
            var tdAction = $("<td>").html(blockKnopok);

            tr.append(tdFirstName);
            tr.append(tdLastName);
            tr.append(tdOperator);
            tr.append(tdPhoneNumber);
            tr.append(tdAction);

            $('.table-contacts tbody').append(tr);
        })

    }
    showContacts();

    // Открытие и закрытие формы добовления контакта
    // Открытие
    $('.add-contact').click(function () {
        if (pokazForm == 0) {
            var formAddContact = $('#edd-block-form-horizontal').clone();
            var blockFormAddContact = $('<div>').addClass("blockFormAddContact");

            $('body').append(blockFormAddContact);
            blockFormAddContact.append(formAddContact);
            blockFormAddContact.animate({
                'marginTop': 150
            })
            formAddContact.fadeIn();
            pokazForm = 1;
        };
    })
    // Открытие и закрытие формы редактирования контакта
    // Открытие
    $('body').on('click', '.table-contacts .table .success', function () {
        var formRedact = $('#block-form-horizontal-redact').clone();
        var blockFormRedact = $('<div>').addClass("blockFormRedact");

        $('body').append(blockFormRedact);
        blockFormRedact.append(formRedact);
        blockFormRedact.animate({
            'marginTop': 150
        })
        formRedact.fadeIn();
        pokazForm = 1;
    })
    // Закрытие
    $('body').on('click', '.button-krest', function () {
        $(".blockFormAddContact, .blockFormRedact").remove();
        pokazForm = 0;
    })


    // Удоление контакта
    function remove(telephone) {
        var indexDelit;
        $.each(contacts, function (index, mas) {
            if (mas.phoneNumber == telephone) {
                indexDelit = index;
            };
        })
        contacts.splice(indexDelit, 1);
        showContacts();
    }
    $('body').on('click', '.table-contacts .danger', function (e) {
        var target = $(e.currentTarget);
        var phoneNumber = target.closest('tr').data("id");
        console.log(phoneNumber);
        remove(phoneNumber);
    })

    // Редактирование контакта
    var oldPhoneNumber = 911;
    var newFirstName = 8;
    var newLastName = 7;
    var newOperator = 6;
    var newPhoneNumber = 5;

    function redactContact(oldPhoneNumber, newFirstName, newLastName, newOperator, newPhoneNumber) {
        $.each(contacts, function (index, mas) {
            if (mas.phoneNumber == oldPhoneNumber) {
                contacts[index]['firstName'] = newFirstName;
                contacts[index]['lastName'] = newLastName;
                contacts[index]['operator'] = newOperator;
                contacts[index]['phoneNumber'] = newPhoneNumber;
            };
        })
        showContacts();
    }
    $('body').click(function (argument) {
        redactContact(oldPhoneNumber, newFirstName, newLastName, newOperator, newPhoneNumber);
    })



})
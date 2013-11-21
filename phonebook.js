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

    // Добовление контакта
    function add(newContact) {
        contacts.push(newContact);
    }
    add({
        firstName: "John",
        lastName: "Resiz",
        operator: "066",
        phoneNumber: "098239146"
    });

    // Вывод контактов
    function showContacts() {
        $('.table-contacts .table tbody').empty();
        $.each(contacts, function (index, contact) {

            var blockKnopok = $("<div>").addClass('btn-block');
            var buttonEdit = $("<button class='btn btn-success success button-success'>").text('Edit');
            var buttonDelit = $("<button class='btn btn-danger danger button-remove'>").text('Delete');
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
            var blockFormAddContact = $('<div>').addClass("blockFormAddContact");
            var addForm = $('#edd-block-form-horizontal').fadeIn();
            blockFormAddContact.append(addForm);
            $('body').append(blockFormAddContact);
            blockFormAddContact.animate({
                'marginTop': 150
            }) 
    })
    // Открытие и закрытие формы редактирования контакта
    // Открытие
    $('body').on('click', '.table-contacts .table .success', function () {
            var blockFormRedact = $('<div>').addClass("blockFormRedact");
            var formRedact = $('#block-form-horizontal-redact').fadeIn();
            blockFormRedact.append(formRedact);
            $('body').append(blockFormRedact);
            blockFormRedact.animate({
                'marginTop': 150
            })
    })
    // Закрытие
    $('body').on('click', '.button-krest', function () {
        $(".blockFormAddContact, .blockFormRedact").fadeOut(100);
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
    $('body').on('click', '.table-contacts .button-remove', function (e) {
        var target = $(e.currentTarget);
        var phoneNumber = target.closest('tr').data("id");
        console.log(phoneNumber);
        remove(phoneNumber);
    })

    // Редактирование контакта
    function redactContact(contact) {
        $.each(contacts, function (index, contacts) {  
            if (contacts.phoneNumber == contact.oldPhoneNumber) {
                contacts.firstName = contact.newFirstName;
                contacts.lastName = contact.newLastName;
                contacts.operator = contact.newOperator;
                contacts.phoneNumber = contact.newPhoneNumber;
            };
        })
        showContacts();
    }
    $('body').click(redactContact({
            oldPhoneNumber: "911",
            newFirstName: "8",
            newLastName: "156845",
            newOperator: "6",
            newPhoneNumber: "5"
        })
    );



})
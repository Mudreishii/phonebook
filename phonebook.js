$(document).ready(function () {

    // Добовление контакта - function
    function add(newContact) {
        contacts.push(newContact);
        alert('asd');
        showContacts();
    }

    // Вывод контактов - function
    function showContacts() {
        $('.table-contacts .table tbody').empty();
        $.each(contacts, function (index, contact) {
            var blockKnopok = $("<div>").addClass('btn-block');
            var buttonEdit = $("<button>").addClass('btn btn-success success button-success').text('Edit');
            var buttonDelit = $("<button>").addClass('btn btn-danger danger button-remove').text('Delete');
            blockKnopok.append(buttonEdit);
            blockKnopok.append(buttonDelit);

            var tr = $("<tr>").data("id",contact.phoneNumber);
            var tdFirstName = $("<td>").text(contact.firstName);
            var tdLastName = $("<td>").text(contact.lastName);
            var tdOperator = $("<td>").text(contact.operator);
            var tdPhoneNumber = $("<td>").text(contact.phoneNumber);
            var tdAction = $("<td>").append(blockKnopok);

            tr.append(tdFirstName);
            tr.append(tdLastName);
            tr.append(tdOperator);
            tr.append(tdPhoneNumber);
            tr.append(tdAction);

            $('.table-contacts .table tbody').append(tr);
        })
    }

    // Удоление контакта - function
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

    // Редактирование контакта - function
    function redactContact(oldPhone, newContact) {
        $.each(contacts, function (index, contact) {  
            if (contact.phoneNumber == oldPhone) {
                contact.firstName = newContact.firstName;
                contact.lastName = newContact.lastName;
                contact.operator = newContact.operator;
                contact.phoneNumber = newContact.phoneNumber;
            };
        })
        showContacts();
    }


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

    // Вывод контактов
    showContacts();

    // Открытие формы добовления контакта
    $('.add-contact').click(function () {           
            $('.blockFormAddContact').fadeIn();
            $('.blockFormAddContact').animate({
                'top': 150
            }) 
    })

    // Создание пользователя
    $('.blockFormAddContact .addNewContact').submit( function () {

        var firstName = $('.blockFormAddContact input[name=first-name]').val();
        var lastName = $('.blockFormAddContact input[name=last-name]').val();
        var operator = $('.blockFormAddContact select').val();   
        var phoneNumber = $('.blockFormAddContact input[name=phone-number]').val();

        if (firstName && lastName && operator && phoneNumber) {
            add({
                firstName: firstName,
                lastName: lastName,
                operator: operator,
                phoneNumber: phoneNumber
                })
        } else {
                alert('не все поля заполненны');
        }  
    })

    // Открытие и закрытие формы редактирования контакта
    // Открытие
    $('body').on('click', '.table-contacts .table .success', function () {
            $('.blockFormRedact').fadeIn();
            $('.blockFormRedact').animate({
                'top': 150
            })
    })
    // Закрытие
    $('body').on('click', '.button-krest, .btn-closest', function () {
        $(".blockFormAddContact, .blockFormRedact").animate({
            'top': 0
        }).fadeOut(100);
    })


    // Удоление контакта
    $('body').on('click', '.table-contacts .button-remove', function (e) {
        var $target = $(e.currentTarget);
        var phoneNumber = $target.closest('tr').data("id");
        console.log(phoneNumber);
        remove(phoneNumber);
    })

    // Редактирование контакта
    // $('body').on('click','.blockFormRedact', function () {
    //     var oldPhoneNumber = "911";
    //     redactContact(oldPhoneNumber, {
    //         firstName: "45",
    //         lastName: "156845",
    //         operator: "6",
    //         phoneNumber: "5"
    //     }) 
    // });



})
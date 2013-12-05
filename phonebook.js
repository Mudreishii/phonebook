$(document).ready(function () {

    // Добовление контакта - function
    function add(newContact) {
        contacts.push(newContact);
        showContacts();
    }

    // Вывод контактов - function
    function showContacts() {
        $('.table-contacts .table tbody').empty();
        $.each(contacts, function (index, contact) {
            if (contact.visible) {
                var blockKnopok = $("<div>").addClass('btn-block');
                var buttonEdit = $("<button>").addClass('btn btn-success button-success btn-edit-contact').text('Edit');
                var buttonDelit = $("<button>").addClass('btn btn-danger button-remove').text('Delete');
                blockKnopok.append(buttonEdit);
                blockKnopok.append(buttonDelit);

                var tr = $("<tr>").data("id",contact.phoneNumber);
                var tdFirstName = $("<td>").text(contact.firstName);
                var tdLastName = $("<td>").text(contact.lastName);
                var tdOperator = $("<td>").text(contact.operator);
                var tdPhoneNumber = $("<td>").addClass('phone-number').text(contact.phoneNumber);
                var tdAction = $("<td>").append(blockKnopok);

                tr.append(tdFirstName);
                tr.append(tdLastName);
                tr.append(tdOperator);
                tr.append(tdPhoneNumber);
                tr.append(tdAction);

                $('.table-contacts .table tbody').append(tr);
            };
        })
    }

    // Удоление контакта - function
    function remove(telephone) {
        var indexDelit;
        $.each(contacts, function (index, contact) {
            if (contact.phoneNumber == telephone) {
                indexDelit = index;
            };
        })
        contacts.splice(indexDelit, 1);
        showContacts();
    }

    // Редактирование контакта - function
    function edit(oldPhone, newContact) {
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
        operator: "093",
        phoneNumber: "0631346611",
        visible: true
    }, {
        firstName: "Александр",
        lastName: "Соловей",
        operator: "067",
        phoneNumber: "911",
        visible: true
    }];

    // Вывод контактов
    showContacts(); 

    // Открытие формы добовления контакта
    $('.add-contact').click(function () {
        $('.blockFormAddContact .addNewContact input[name=first-name], input[name=last-name], input[name=phone-number]').val('');
        $('.blockFormAddContact').fadeIn();
        $('.blockFormAddContact').animate({
            'top': 150
        },'fast') 
    })

    // Создание пользователя
    $('.blockFormAddContact .contact-form').submit( function (event) {
        event.preventDefault();

        var firstName = $('.blockFormAddContact input[name=first-name]').val();
        var lastName = $('.blockFormAddContact input[name=last-name]').val();
        var operator = $('.blockFormAddContact select[name=operator]').val();   
        var phoneNumber = $('.blockFormAddContact input[name=phone-number]').val();

        if (!firstName) {
            alert('Введите имя');
            return;
        };
        if (!lastName) {
            alert('Введите фамилию');
            return;
        };
        if (!phoneNumber) {
            alert('Введите телефон');
            return;
        };

        var contactExists = false;
        $.each(contacts,function (index, contact) {
            if (contact.phoneNumber==phoneNumber) {
                contactExists = true;
                return false;   
            }
        })
        if (!contactExists) {
            add({
                firstName: firstName,
                lastName: lastName,
                operator: operator,
                phoneNumber: phoneNumber,
                visible: true
                }) 
        } else {
            edit(phoneNumber, {
                firstName: firstName,
                lastName: lastName,
                operator: operator,
                phoneNumber: phoneNumber,
                visible: true
            })
        };
        $(".blockFormAddContact").animate({
            'top': 0
        },'fast').fadeOut();
    })
    

    // Открытие и закрытие формы редактирования контакта
    // Открытие
    $('body').on('click', '.table-contacts .table .btn-edit-contact', function (e) {
        $('.blockFormRedact').fadeIn();
        $('.blockFormRedact').animate({
            'top': 150
        })
        var oldPhoneNumber = $(e.currentTarget).closest('tr').find('.phone-number').text();
        $.each(contacts, function (index, contact) {
            if (contact.phoneNumber==oldPhoneNumber) {
                $('.blockFormRedact input[name=first-name]').val(contact.firstName);
                $('.blockFormRedact input[name=last-name]').val(contact.lastName);
                $('.blockFormRedact select[name=operator]').val(contact.operator); 
                $('.blockFormRedact input[name=phone-number]').val(contact.phoneNumber);
            };
        })
        

        
    })
    // Закрытие
    $('body').on('click', '.button-krest', function () {
        $(".blockFormAddContact, .blockFormRedact").animate({
            'top': 0
        },'fast').fadeOut();
    })


    // Удоление контакта
    $('body').on('click', '.table-contacts .button-remove', function (e) {
        var $target = $(e.currentTarget);
        var phoneNumber = $target.closest('tr').data("id");
        console.log(phoneNumber);
        remove(phoneNumber);
    })

    



})
$(document).ready(function () {

    // Обьявление коллекции
    var contacts = [{
        firstName: "Дима",
        lastName: "Белов",
        operator: "93",
        phoneNumber: "0631346611",
        visible: true
    }, {
        firstName: "Александр",
        lastName: "Соловей",
        operator: "67",
        phoneNumber: "911",
        visible: true
    }];

    // Добовление контакта - function
    function add(newContact) {
        contacts.push(newContact);
        showContacts();
    };

    // Вывод контактов - function
    function showContacts() {
        $('.show-contacts .table tbody').empty();
        $.each(contacts, function (index, contact) {
            if (contact.visible) {
                var blockKnopok = $("<div>").addClass('btn-block');
                $("<button>").addClass('btn btn-success button-success btn-edit-contact').text('Edit').appendTo(blockKnopok);
                $("<button>").addClass('btn btn-danger button-remove').text('Delete').appendTo(blockKnopok);

                var tr = $("<tr>").data("id",contact.phoneNumber);
                $("<td>").text(contact.firstName).appendTo(tr);
                $("<td>").text(contact.lastName).appendTo(tr);
                $("<td>").text(contact.operator).appendTo(tr);
                $("<td>").text(contact.phoneNumber).appendTo(tr);
                $("<td>").append(blockKnopok).appendTo(tr);
                $('.show-contacts .table tbody').append(tr);
            };
        });
    };

    // Удоление контакта - function
    function remove(telephone) {
        $.each(contacts, function (index, contact) {
            if (contact.phoneNumber == telephone) {
                contacts.splice(index, 1);
                return false;
            };
        });
        showContacts();
    };

    // Редактирование контакта - function
    function edit(oldPhone, newContact) {
        $.each(contacts, function (index, contact) {  
            if (contact.phoneNumber == oldPhone) {
                contact.firstName = newContact.firstName;
                contact.lastName = newContact.lastName;
                contact.operator = newContact.operator;
                contact.phoneNumber = newContact.phoneNumber;
            };
        });
        showContacts();
    };

    // Вывод контактов
    showContacts(); 

    // Открытие формы добовления контакта
    $('.add-contact').click(function () {
        $('.block-form-add-contact .add-new-contact input').val('');
        $('.block-form-add-contact .add-new-contact input[type=submit]').val('Sign in');
        $('.block-form-add-contact').fadeIn();
        $('.block-form-add-contact').animate({
            'top': 150
        },'fast'); 
    });

    // Создание пользователя
    $('.block-form-add-contact .contact-form').submit( function (event) {
        event.preventDefault();

        var firstName = $('.block-form-add-contact input[name=first-name]').val();
        var lastName = $('.block-form-add-contact input[name=last-name]').val();
        var operator = $('.block-form-add-contact select[name=operator]').val();   
        var phoneNumber = $('.block-form-add-contact input[name=phone-number]').val();
        
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
            };
        });
        if (!contactExists) {
            add({
                firstName: firstName,
                lastName: lastName,
                operator: operator,
                phoneNumber: phoneNumber,
                visible: true
            }); 
        } else {
            edit(phoneNumber, {
                firstName: firstName,
                lastName: lastName,
                operator: operator,
                phoneNumber: phoneNumber,
                visible: true
            });
        };
        $(".block-form-add-contact").animate({
            'top': 0
        },'fast').fadeOut();
    });

    // Открытие и закрытие формы редактирования контакта
    // Открытие
    $('body').on('click', '.show-contacts .table .btn-edit-contact', function (e) {
        $('.block-form-redact').fadeIn();
        $('.block-form-redact').animate({
            'top': 150
        });
        var oldPhoneNumber = $(e.currentTarget).closest('tr').data("id");
        $.each(contacts, function (index, contact) {
            if (contact.phoneNumber==oldPhoneNumber) {
                $('.block-form-redact input[name=first-name]').val(contact.firstName);
                $('.block-form-redact input[name=last-name]').val(contact.lastName);
                $('.block-form-redact select[name=operator]').val(contact.operator); 
                $('.block-form-redact input[name=phone-number]').val(contact.phoneNumber);
                $('.block-form-redact input[name=hidden-phone]').val(contact.phoneNumber);
                return false;
            };
        });
    });
    // Закрытие
    $('body').on('click', '.button-krest', function () {
        $(".block-form-add-contact, .block-form-redact, .block-statistic").animate({
            'top': 0
        },'fast').fadeOut();
    });

    // Редактирование контакта
    $('.block-form-redact .contact-form').submit(function (event) {
        event.preventDefault();
        var rememberPhone = $('.block-form-redact input[name=hidden-phone]').val();
        edit(rememberPhone, {
            firstName: $('.block-form-redact input[name=first-name]').val(),
            lastName: $('.block-form-redact input[name=last-name]').val(),
            operator: $('.block-form-redact select[name=operator]').val(),
            phoneNumber: $('.block-form-redact input[name=phone-number]').val()
        });
        $(".block-form-redact").animate({
            'top': 0
        },'fast').fadeOut();
    });

    // Удоление контакта
    $('body').on('click', '.show-contacts .button-remove', function (e) {
        var $target = $(e.currentTarget);
        var phoneNumber = $target.closest('tr').data("id");
        remove(phoneNumber);
    });

    // Статистика
    $('.show-statistics').click(function () {
        var stat = [];
        stat[50] = 0;
        stat[93] = 0;
        stat[67] = 0;
        stat[68] = 0;
        $.each(contacts, function (index, contact) {
            stat[contact.operator]++;
        });
        $('.block-statistic .mtc-stat').text(stat[50]);
        $('.block-statistic .life-stat').text(stat[93]);
        $('.block-statistic .kiivstar-stat').text(stat[67]);
        $('.block-statistic .bilain-stat').text(stat[68]);

        $('.block-statistic') .fadeIn();
        $('.block-statistic').animate({
            'top': 150
        },'fast');
    });

    // Поиск
    $('.search-query').keyup(function () {
        var searchValue = $(this).val();

        if (searchValue == '') {
            $.each(contacts, function (index, contact) {
                contact.visible = true;
            });
        } else {
            $.each(contacts, function (index, contact) {
                if (contact.firstName.indexOf(searchValue)>=0 || contact.lastName.indexOf(searchValue)>=0 || contact.operator.indexOf(searchValue)>=0 || contact.phoneNumber.indexOf(searchValue)>=0) {
                    console.log(contact.firstName);
                    contact.visible = true;
                } else {
                    contact.visible = false;
                };
            });
        };
        showContacts();
    });

    // Сортировка
    $('.sort-op').click(function () {
        for (var i = 0; i < contacts.length; i++) {
            for (var v = 0; v < contacts.length; v++) {
                if (contacts[i]['operator'] < contacts[v]['operator']) {
                    var firstName = contacts[i]['firstName'];
                    var lastName = contacts[i]['lastName'];
                    var operator = contacts[i]['operator'];
                    var phoneNumber = contacts[i]['phoneNumber'];

                    contacts[i]['firstName'] = contacts[v]['firstName'];
                    contacts[i]['lastName'] = contacts[v]['lastName'];
                    contacts[i]['operator'] = contacts[v]['operator'];
                    contacts[i]['phoneNumber'] = contacts[v]['phoneNumber'];

                    contacts[v]['firstName'] = firstName;
                    contacts[v]['lastName'] = lastName;
                    contacts[v]['operator'] = operator;
                    contacts[v]['phoneNumber'] = phoneNumber;
                    
                    showContacts();
                };
            };
        };
    });

    // var mas = [6,2,5,502,1,3,9,8,15,1];
    // for (var a = 0; a < mas.length; a++) {
    //     for (var b = 0; b < mas.length; b++) {
    //         if (mas[a]<mas[b]) {
    //             var a1 = mas[a];
    //             var b1 = mas[b];
    //             mas[a] = b1; mas[b] = a1;
    //         };
    //     };
    // };
});


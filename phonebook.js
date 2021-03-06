$(document).ready(function () {

    // Переключатель сортировки операторов
    var click = true;

    // Массив контактов
    var contacts = [];

    // Локальное хранилище контактов
    if (localStorage.getItem('contacts')) {
        contacts = JSON.parse(localStorage.getItem('contacts'));
    };
    
    // Добавление контакта - function
    function add(newContact) {
        contacts.push(newContact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        showContacts();
    };

    // Вывод контактов - function
    function showContacts() {
        $('.show-contacts .table tbody').empty();
        if (contacts.length == 0) {
            $('.not-found-contacts').fadeIn();
        } else {
            $('.not-found-contacts').fadeOut();
        };
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
        localStorage.setItem('contacts', JSON.stringify(contacts));
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
        localStorage.setItem('contacts', JSON.stringify(contacts));
        showContacts();
    };

    // Сортировка - function
    function sortContacts (sortBy) {
        for (var i = 0; i < contacts.length; i++) {
            for (var v = i; v < contacts.length; v++) {
                if (contacts[i][sortBy] > contacts[v][sortBy] == click) {
                    var a = contacts[i];
                    contacts[i] = contacts[v];
                    contacts[v] = a;
                };
            };
        };
        click = !click;
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
        // var $target = $(e.currentTarget);
        var phoneNumber = $(this).closest('tr').data("id");
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
        $('.block-statistic .mts-stat').text(stat[50]);
        $('.block-statistic .life-stat').text(stat[93]);
        $('.block-statistic .kyivstar-stat').text(stat[67]);
        $('.block-statistic .beeline-stat').text(stat[68]);

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
    $('.show-contacts .table th').click(function (e) {
        $(this).toggleClass('desc');
        var sort = $(this).data("sort");
        sortContacts(sort);
    });




});


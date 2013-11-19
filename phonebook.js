$(document).ready(function () {
	

var contacts = [
	{
		firstName:"Дима",
		lastName:"Белов",
		operator:"063",
		phoneNumber:"0631346611"
	},
	{
		firstName:"Александр",
		lastName:"Соловей",
		operator:"067",
		phoneNumber:"911"
	}
];

// =============================================
var pokazForm = 0; // Счётчик открытия и закрытия формы

// Добовление контакта
add ({
firstName: "John",
lastName: "Resiz",
operator: "066",
phoneNumber: "098239146"
});

function add (newContact) {
	contacts.push(newContact);
}

// Вывод контактов
function vivodContacts () {
	$.each(contacts, function (index, contact) {
	
		var blockKnopok = $("<div>");
		var buttonEdit = $("<button class='btn btn-success success'>").text('Edit');
		var buttonDelit = $("<button class='btn btn-danger danger' style='margin-left:5px'>").text('Delete');
		blockKnopok.append(buttonEdit);
		blockKnopok.append(buttonDelit);


		var tr = $("<tr>");
		var tdFirstName = $("<td>").text(contact.firstName);
		var tdLastName = $("<td>").text(contact.lastName);
		var tdOperator = $("<td>").text(contact.operator);
		var tdPhoneNumber = $("<td>").addClass("tdPhon").text(contact.phoneNumber);
		var tdAction = $("<td>").html(blockKnopok);

		tr.append(tdFirstName);
		tr.append(tdLastName);
		tr.append(tdOperator);
		tr.append(tdPhoneNumber);
		tr.append(tdAction);

		$('.table-contacts tbody').append(tr);
	})
	
}
vivodContacts();


// фывфывфвфвы
// Открытие и закрытие формы добовления контакта
// Открытие
$('.add-contact').click(function  () {
	if (pokazForm==0) {
		var formAddContact = $('#edd-block-form-horizontal').clone();
		var blockFormAddContact = $('<div>').addClass("blockFormAddContact");

		$('body').append(blockFormAddContact);
		blockFormAddContact.append(formAddContact);
		blockFormAddContact.animate({
			'marginTop': 150
		})
		formAddContact.fadeIn();
		pokazForm=1;
	};
})
// Закрытие
$('body').on('click','.button-krest',function () {
	$(".blockFormAddContact").remove();
	pokazForm=0;
})


// Удоление контакта

// $('.table-contacts .danger').click(function (event) {
// 	var a = $(event.currentTarget);
// 	var b = a.closest('tr').find('.tdPhon').text();
// 	console.log(b);
// 	for (var i = 0; i < contacts.length; i++) {
// 		if (contacts[i]['phoneNumber']==b) {
// 			contacts.splice(i);
// 			console.log(contacts);
// 			// console.log(contacts[i]['firstName']);
// 		};
// 	};
// })


// var z = 911;

function remove (telephone) {
	var indexDelit;
	$.each(contacts, function (index, mas) {
		if (mas.phoneNumber==telephone) {
			indexDelit=index;
			alert(indexDelit);
			console.log(contacts);
		};
	})
	contacts.splice(indexDelit,1);
	console.log(contacts);
}
remove(911);




})
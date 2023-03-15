'use strict';

//обработчик события: запуск скрипта, при полной загрузке DOM-дерева
document.addEventListener('DOMContentLoaded', () => {

    //получаем элементы страницы
    const form = document.querySelector('form');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const repeatePasswordInput = document.getElementById('password-repeat');
    const birthdayInput = document.getElementById('birthday');

    //задаем проверки для ввода данных
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]+$/;
    const emailRegex = /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_-]+)\.([a-zA-Z]{2,5})$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:";'<>?,./]).{8,}$/;

    //функция валидации имени и фамилии
    function validateName(input) {
        if (!nameRegex.test(input.value.trim())) {
            input.setCustomValidity('Имя и фамилия должны содержать только буквы');
        } else if (input.value.trim().length < 2 || input.value.trim().length > 50) {
            input.setCustomValidity('Имя и фамилия должны содержать от 2 до 50 символов');
        } else {
            input.setCustomValidity('');
        }
    }

    //функция валидации email-адреса
    function validateEmail(input) {
        if (!emailRegex.test(input.value.trim())) {
            input.setCustomValidity('Введите корректный email-адрес');
        } else {
            input.setCustomValidity('');
        }
    }

    //функция валидации и подтверждения пароля
    function validatePassword(input) {
        const passwordValue = passwordInput.value;
        const repeatePasswordValue = repeatePasswordInput.value;
        if (!passwordRegex.test(input.value)) {
            input.setCustomValidity('Пароль должен содержать минимум 8 символов, по одной заглавной и строчной букве, цифре и символу');
        } else {
            input.setCustomValidity('');
        }
        if (passwordValue !== repeatePasswordValue) {
            repeatePasswordInput.setCustomValidity('Пароли не совпадают');
        } else {
            repeatePasswordInput.setCustomValidity('');
        }
    }

    //функция валидации даты рождения
    function validateBirthday(input) {
        const birthDate = new Date(input.value);
        const currentDate = new Date();
        const birthDay = birthDate.getDate();
        const birthMonth = birthDate.getMonth();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const ageDiff = currentDate.getFullYear() - birthDate.getFullYear();
        if (ageDiff < 18 || (ageDiff === 18 && (birthMonth > currentMonth || (birthMonth === currentMonth && birthDay > currentDay)))) {
            input.setCustomValidity('Возраст регистрации должен быть не младше 18 лет');
        } else {
            input.setCustomValidity('');
        }
    }

    //обработчик событий для вызов функций валидации, при изменении соответствующих полей
    firstNameInput.addEventListener('input', function () {
        validateName(firstNameInput);
    });

    lastNameInput.addEventListener('input', function () {
        validateName(lastNameInput);
    });

    emailInput.addEventListener('input', function () {
        validateEmail(emailInput);
    });

    passwordInput.addEventListener('input', function () {
        validatePassword(passwordInput);
    });

    repeatePasswordInput.addEventListener('input', function () {
        validatePassword(repeatePasswordInput);
    });

    birthdayInput.addEventListener('input', function () {
        validateBirthday(birthdayInput);
    });

    //обработчик события для отправки формы
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Форма отправлена!');
    });
});
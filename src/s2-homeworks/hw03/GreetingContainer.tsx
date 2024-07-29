import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import Greeting from './Greeting'
import {UserType} from './HW3'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type GreetingContainerPropsType = {
    users: UserType[];
    addUserCallback: (name: string) => void;
}

export const pureAddUser = (name: string, setError: React.Dispatch<React.SetStateAction<string | null>>, setName: React.Dispatch<React.SetStateAction<string>>, addUserCallback: (name: string) => void) => {
    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут

    // Проверка на пустую строку или строку из пробелов
    if (!name.trim()) {
        setError('Ошибка! Введите имя!');
        return;
    }
    // Добавление пользователя, очистка инпута и сброс ошибки
    addUserCallback(name);
    setName("");
    setError("");
}

export const pureOnBlur = (name: string, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
    // если имя пустое - показать ошибку

    // Если имя пустое или состоит только из пробелов - показать ошибку
    if (!name.trim()) {
        setError('Ошибка! Введите имя!')
    } else {
        setError('')
    }
}

export const pureOnEnter = (e: KeyboardEvent, addUser: () => void) => {
    // если нажата кнопка Enter - добавить
    if (e.key === "Enter") {
        addUser()

    }
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
                                                                     users,
                                                                     addUserCallback,
                                                                 }) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);


    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
        const trimmedName = e.currentTarget.value; // Без обрезания пробелов
        setName(trimmedName);
        error && setError(null);
    }


    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length;
    const lastUserName = totalUsers != 0 && !error ? users[totalUsers - 1].name : "";

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer

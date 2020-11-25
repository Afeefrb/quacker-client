import {useState} from 'react';

export const useForm = (callback, initialState = {}) => {

    const [inputValues, setInputValues] = useState(initialState);

    const onChangeInput = (event) => {
        setInputValues({...inputValues, [event.target.name]:event.target.value})
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        callback()
    }

    return {
        inputValues,
        onChangeInput,
        onSubmitHandler
    }

}
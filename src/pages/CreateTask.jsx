import { Form } from "react-router-dom"
import { useCollection } from "../hook/useCollection"
import Select from 'react-select';
import { useEffect, useState } from "react";
function CreateTask() {
    const { data } = useCollection("users")
    const [userOptions, setUserOptions] = useState(null)
    useEffect(() => {
        const users = data?.map((user) => {
            return {
                value: user.displayName,
                label: user.displayName,
                photoURL: user.photoUrl,
                uid: user.uid
            }
        })
        setUserOptions(users)
    }, [data])
    console.log(userOptions);
    
    return (
        <Form method="post" className="form">
            <label htmlFor="title">Title:</label>
            <input type="text" placeholder="" id="title" name="title" />
            <label htmlFor="description">Description:</label>
            <textarea name="description" id="description" label="Description"></textarea>
            <label htmlFor="doeto">Due to:</label>
            <input type="date" placeholder="" id="doeto" name="due-to" />
            <Select
                isMulti
                name="Users"
                options={userOptions}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </Form>

    )
}

export default CreateTask
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea, Loader, Input } from '../../components';
import useFetch from '../../hooks/useFetch';
import validateManyFields from '../../validations';
import { useAuth } from '../../hooks/useAuthProvider';

const Task = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [fetchData, { loading }] = useFetch();
    const { taskId } = useParams();

    const mode = taskId === undefined ? "add" : "update";
    const [task, setTask] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        status: "pending",
        description: ""
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (mode === "update") {
            const config = { url: `/tasks/${taskId}`, method: "get", headers: { Authorization: "Bearer " + token } };
            fetchData(config, { showSuccessToast: false }).then((data) => {
                setTask(data);
                setFormData({ title: data.title, status: data.status, description: data.description });
            });
        }
    }, [mode, token, taskId, fetchData]);



    const handleChange = e => {
        setFormErrors({});
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    const handleReset = e => {
        e.preventDefault();
        setFormData({
            description: task.description
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const errors = validateManyFields("task", {
            title: formData.title,
            status: formData.status
        });
        setFormErrors({});

        if (errors.length > 0) {
            setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
            return;
        }

        if (mode === "add") {
            const config = { url: "/tasks", method: "post", data: formData, headers: { Authorization: "Bearer " + token } };
            fetchData(config).then(() => {
                navigate("/tasks");
            });
        }
        else {
            const config = { url: `/tasks/${taskId}`, method: "patch", data: formData, headers: { Authorization: "Bearer " + token } };
            fetchData(config).then(() => {
                navigate("/tasks");
            });
        }
    }


    const fieldError = (field) => (
        <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
            <i className='mr-2 fa-solid fa-circle-exclamation'></i>
            {formErrors[field]}
        </p>
    )

    return (
        <>
            <form className='m-auto my-16 max-w-[1000px] bg-white p-8 border-2 shadow-md rounded-md'>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <h2 className='text-center mb-4'>{mode === "add" ? "Add New Task" : "Edit Task"}</h2>
                        <div className="mb-4">
                            <label htmlFor="title" className="after:content-['*'] after:ml-0.5 after:text-red-500">Title</label>
                            <Input type="text" name="title" id="title" value={formData.title} placeholder="Task name" onChange={handleChange} />
                            {fieldError("title")}
                        </div>
                        <div className="mb-4">
                            <label for="status" className="after:content-['*'] after:ml-0.5 after:text-red-500">Status</label>
                            <select id="status" name="status" className="block w-full mt-2 px-3 py-2 text-gray-600 rounded-[4px] border-2 border-gray-100">
                                <option value="pending" selected={formData.status === 'pending'}>Pending</option>
                                <option value="in_progress" selected={formData.status === 'in_progress'}>In Progress</option>
                                <option value="done" selected={formData.status === 'done'}>Done</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description">Description</label>
                            <Textarea type="description" name="description" id="description" value={formData.description} placeholder="Write here.." onChange={handleChange} />
                        </div>

                        <button className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark' onClick={handleSubmit}>{mode === "add" ? "Add task" : "Update Task"}</button>
                        <button className='ml-4 bg-red-500 text-white px-4 py-2 font-medium' onClick={() => navigate("/tasks")}>Cancel</button>
                        {mode === "update" && <button className='ml-4 bg-blue-500 text-white px-4 py-2 font-medium hover:bg-blue-600' onClick={handleReset}>Reset</button>}
                    </>
                )}
            </form>
        </>
    )
}

export default Task
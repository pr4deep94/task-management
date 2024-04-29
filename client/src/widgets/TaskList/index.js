import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { Loader, Tooltip } from '../../components';
import { useAuth } from '../../hooks/useAuthProvider';

const Tasks = () => {

  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: "Bearer " + token } };
    fetchData(config, { showSuccessToast: false }).then(res => {
      console.log("res", res)
      setTasks(res)
    });
  }, [token, fetchData]);

  useEffect(() => {
    if (!token) return;
    fetchTasks();
  }, [token, fetchTasks]);


  const handleDelete = (id) => {
      const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: "Bearer " + token } };
      fetchData(config).then(() => fetchTasks());
  }


  return (
    <>
      <div className="my-2 mx-auto max-w-[700px] py-4">

        {tasks.length !== 0 && <h2 className='my-2 ml-2 md:ml-0 text-xl'>Your tasks ({tasks.length})</h2>}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks.length === 0 ? (

              <div className='w-[600px] h-[300px] flex items-center justify-center gap-4'>
                <span>No tasks found</span>
                <Link to="/tasks/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2">+ Add new task </Link>
              </div>

            ) : (
              tasks.map((task, index) => (
                <div key={task._id} className='bg-white my-4 p-4 text-gray-600 rounded-md shadow-md'>
                  <div className='flex'>

                    <span className='font-medium'>Task #{index + 1}</span>

                    <Tooltip text={"Edit this task"} position={"top"}>
                      <Link to={`/tasks/${task.id}`} className='ml-auto mr-2 text-green-600 cursor-pointer'>
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </Tooltip>

                    <Tooltip text={"Delete this task"} position={"top"}>
                      <span className='text-red-500 cursor-pointer' onClick={() => handleDelete(task.id)}>
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </Tooltip>

                  </div>
                  <div className='whitespace-pre'>{task.title}</div>
                </div>
              ))

            )}
          </div>
        )}
      </div>
    </>
  )

}

export default Tasks
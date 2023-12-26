import React, {useState} from 'react';

const Problem1 = () => {

    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({ name: "", status: "active" });

    const addTask = () => {
      setTasks([...tasks, formData]);
      setFormData({ name: "", status: "active" });
    };

    const filterTasks = (filter) => {
      let filteredTasks;
      if (filter === "all") {
        filteredTasks = [...tasks];
      } else {
        filteredTasks = tasks.filter((task) => task.status === filter);
      }

      // Custom sorting: active first, completed next, others last
      filteredTasks.sort((a, b) => {
        const order = { active: 1, completed: 2 };
        return order[a.status] - order[b.status];
      });

      setTasks(filteredTasks);
    };

    return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
          <div className="col-6 ">
            <form className="row gy-2 gx-3 align-items-center mb-4">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Status"
                  name="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-auto">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={addTask}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-8">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item">
                <button
                  className={`nav-link ${formData === "all" && "active"}`}
                  type="button"
                  onClick={() => filterTasks("all")}
                >
                  All
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${formData === "active" && "active"}`}
                  type="button"
                  onClick={() => filterTasks("active")}
                >
                  Active
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${formData === "completed" && "active"}`}
                  type="button"
                  onClick={() => filterTasks("completed")}
                >
                  Completed
                </button>
              </li>
            </ul>
            <div className="tab-content"></div>
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.name}</td>
                    <td>{task.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default Problem1;
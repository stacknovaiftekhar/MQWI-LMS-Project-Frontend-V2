import { Link, Outlet, useLocation } from 'react-router';
import { CategoryList } from "../../../api/course";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useDelete from '../../../hooks/useDelete';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => { fetchCategories(); }, []);

  useEffect(() => {
    if (location.state?.reload) {
      fetchCategories();
    }
  }, [location.state]);

  const fetchCategories = async () => {
    try {
      const response = await CategoryList();
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to Fetch Categories:", error);
    }
  };

  const handleDelete = useDelete('courses/categories', setCategories, { onSuccess: fetchCategories });

  return (
    <div className="container-fluid p-3">
      <div className="row">
        {/* LEFT: Category List */}
        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0 text-success">Category List</h4>
            <Link to="create" className="btn btn-green btn-sm px-3 fw-bold">Add Category</Link>
          </div>

          <table className="table table-bordered table-striped table-success table-hover">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>Name</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={category.id}>
                    <td className="text-center">{index + 1}</td>
                    <td className='hsf'>{category.name}</td>
                    <td className="text-center">
                      <Link to={`update/${category.id}`} className="btn btn-sm btn-warning me-2"><FaEdit /></Link>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(category.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" className="text-center text-danger">No Categories Found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* RIGHT: Create / Update Form */}
        <div className="col-md-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Category;
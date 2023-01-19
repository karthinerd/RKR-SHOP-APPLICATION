import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import authHeader from "../Services/auth-header";
import _ from "lodash";

const ActivateHistory = () => {

  const { id } = useParams();

  const [users, setUsers] = useState([]);
   
  const pageSize = 10 ;

  const [paginatedPosts,setPaginatedPosts] = useState([]);

  const [currentPage , setCurrentPage] = useState(1);

  const pageCount = users? Math.ceil(users.length/pageSize):0;

  const pages = _.range(1,pageCount+1);

  const pagination = (pageno)=>{
    setCurrentPage(pageno);
    const startIntex = (pageno - 1) * pageSize;
    const paginatedPost = _(users).slice(startIntex).take(pageSize).value();
    setPaginatedPosts(paginatedPost);
  }

    useEffect(() => {
        loadUsers();
      }, []);
    
      const loadUsers = async () => {
        const result = await axios.get(`http://localhost:8001/api/auth/getActivityLog/${id}`, {
          headers: authHeader(),
        });
        setUsers(result.data.dataObject);
        setPaginatedPosts(_(result.data.dataObject).slice(0).take(pageSize).value());
      };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">Activate Date</th>
              <th scope="col">User Name</th>
              <th scope="col">Product Name</th>
              <th scope="col">Balance Points</th>
              <th scope="col">Deducted Points</th>
              <th scope="col">Deducted Date</th>
              <th scope="col">Added Points</th>
              <th scope="col">Added Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {/* {index + 1} */}
                  {user.userId}
                </th>
                <td>{user.activatedAt}</td>
                <td>{user.userName}</td>
                <td>{user.productName}</td>
                <td>{user.balancePoints}</td>
                <td>{user.deductedPoints}</td>
                <td>{user.deductedTime}</td>
                <td>{user.addedPoints}</td>
                <td>{user.pointsAddedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            {
              pages.map((page)=>(
                <li className={
                  page === currentPage ? "page-item active" : "page-item"
                }>
                  <p className="page-link"
                  onClick={()=>pagination(page)}
                  >{page}</p>
                  </li>
              ))
            }
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ActivateHistory;
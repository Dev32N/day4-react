import React, { useEffect, useState } from 'react';
import { Button, Container, Input, Table } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Utility functions for validation
const validateName = (name) => /^[\p{L}\s]+$/u.test(name);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Standard email format
const validatePhone = (phone) => /^\+?\d[\d\s\-()]{7,}$/.test(phone);

export default function Hook3() {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const url = "https://66a07b167053166bcabb88a8.mockapi.io/Student";

    const getStudents = () => {
        axios.get(url)
            .then(function(res){
                setData(res.data);
            })
            .catch(function(error){
                console.log(error);
            });
    };

    // Delete student
    const deleteStudent = (id) => {
        axios({
            method: 'delete',
            url: `${url}/${id}`,
        })
            .then(function(res){
                toast.success("Delete thành công");
                setData(data.filter(item => item.id !== id));
            })
            .catch(function(error){
                console.log(error);
                toast.error("Delete thất bại");
            });
    };

    // Add student
    const addStudent = () => {
        if (!name || !email || !phone) {
            toast.error("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        if (!validateName(name)) {
            toast.error("Tên không hợp lệ. Vui lòng nhập lại.");
            return;
        }
        if (!validateEmail(email)) {
            toast.error("Email không hợp lệ. Vui lòng nhập lại.");
            return;
        }
        if (!validatePhone(phone)) {
            toast.error("Số điện thoại không hợp lệ. Vui lòng nhập lại.");
            return;
        }

        axios({
            method: 'post',
            url: url,
            data: {
                name: name,
                email: email,
                phone: phone
            }
        })
            .then(function(res){
                toast.success("Add thành công");
                setData([...data, res.data]);
                setName("");
                setEmail("");
                setPhone("");
            })
            .catch(function(error){
                console.log(error);
                toast.error("Add thất bại");
            });
    };

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <div>
            <Container className='text-center'>
                <h1>Student List</h1>
                <Input
                    className='m-2 p-2'
                    type='text'
                    value={name}
                    placeholder='Nhập tên học sinh'
                    onChange={(event) => setName(event.target.value)}
                />
                <Input
                    className='m-2 p-2'
                    type='email'
                    value={email}
                    placeholder='Nhập Email'
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                    className='m-2 p-2'
                    type='text'
                    value={phone}
                    placeholder='Nhập số điện thoại'
                    onChange={(event) => setPhone(event.target.value)}
                />
                <Button
                    className='m-4'
                    color='primary'
                    onClick={addStudent}
                >
                    Add Student
                </Button>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>
                                    <Button onClick={() => deleteStudent(item.id)} className='btn btn-danger'>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ToastContainer />
            </Container>
        </div>
    );
}

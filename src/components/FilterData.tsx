"use client";
import React, { useState } from 'react';
import { usersData } from './Helper';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

type typeUser = keyof User;


const FilterData = () => {
    const [search, setSearch] = useState("");
    const [chooseValue, setChooseValue] = useState<typeUser>("firstName");
    const [filteredData, setFilteredData] = useState(usersData);
    // const itemsPerPage = 4;
    // const [currentPage, setCurrentPage] = useState(1);
    // const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    // const currentData = filteredData.slice(
    //     (currentPage - 1) * itemsPerPage,
    //     currentPage * itemsPerPage
    // );

    const [minRange, setMinRange] = useState(Number);
    const [maxRange, setMaxRange] = useState(Number);
    

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const filtered = usersData.filter((item) => {
            return item[chooseValue].toString().toLowerCase().match(search.toLowerCase())
        });
        setFilteredData(filtered);
        // setCurrentPage(1);
    };
    const rangeHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const filtered = usersData.filter((item) => {
            const id = item.id;
            return id >= minRange && id <= maxRange;
        });
        setFilteredData(filtered);
        // setCurrentPage(1);
    }
    return (
        <div>
            <div className='max-w-[800px] mx-auto bg-white'>
                <div className='sticky top-0 pt-6 pb-2 bg-white'>
                    <form onSubmit={submitHandler}>
                        <select
                            name="data"
                            id="userdata"
                            className='border cursor-pointer p-2 me-4'
                            onChange={(e) => setChooseValue(e.target.value as typeUser)}
                        >
                            <option value="firstName">First Name</option>
                            <option value="lastName">Last Name</option>
                            <option value="email">Email</option>
                        </select>
                        <input
                            className='border p-2'
                            type="search"
                            id="gsearch"
                            onChange={(e) => setSearch(e.target.value)}
                            name="gsearch"
                            placeholder='search'
                        />
                        <input type="submit" className='bg-blue-700 text-white border border-blue-700 hover:text-blue-700 duration-300 hover:bg-white cursor-pointer py-2 px-4 mx-4' value="submit" />
                    </form>
                    <form onSubmit={rangeHandler} className='flex gap-6 pt-6'>
                        <h2>Range</h2>
                        <input placeholder='min' onChange={(e) => setMinRange(Number(e.target.value))} className='p-2 w-[100px] border' type="number" />
                        <input placeholder='max' onChange={(e) => setMaxRange(Number(e.target.value))} className='p-2 w-[100px] border' type="number" />
                        <input type="submit" className='bg-blue-700 text-white border border-blue-700 hover:text-blue-700 duration-300 hover:bg-white cursor-pointer py-2 px-4 ' value="submit" />
                    </form>
               </div>
                <div className="flex gap-6 border p-2 mt-6 bg-black bg-opacity-30">
                    <p className="values w-2/12 text-base font-bold">Number</p>
                    <p className="values w-3/12 text-base font-bold">First Name</p>
                    <p className="values w-3/12 text-base font-bold">Last Name</p>
                    <p className="values w-4/12 text-base font-bold">Email</p>
                </div>
                <div className=''>
                    {filteredData.length > 0 ? (
                        filteredData.map((obj, index) => (
                            <ul className='flex items-center p-2 border gap-6' key={index}>
                                <li className='w-2/12 text-sm capitalize'>{obj.id}</li>
                                <li className='w-3/12 text-sm capitalize'>{obj.firstName}</li>
                                <li className='w-3/12 text-sm capitalize'>{obj.lastName}</li>
                                <li className='w-4/12 text-sm'>{obj.email}</li>
                            </ul>
                        ))
                    ) : (
                        <div>No Data Found</div>
                    )}
                </div>

                {/* <div className="flex justify-between items-center py-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className="px-4 py-2 bg-blue-700 border border-blue-700 hover:bg-white duration-300 hover:text-blue-700  text-white rounded-md"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className="px-4 py-2 bg-blue-700 border border-blue-700 hover:bg-white duration-300 hover:text-blue-700  text-white rounded-md"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div> */}
            </div>
        </div>
    );
}

export default FilterData;

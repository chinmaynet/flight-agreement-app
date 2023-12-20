"use client"
import { useTable, useSortBy, Column } from 'react-table';
import { useState, useEffect } from 'react';
import Link from "next/link";
enum ContactPreference {
    Email = 0,
    Phone = 1,
    Landline = 2,
}

interface TourOperator {
    tourOperatorId: string;
    tourOperatorName: string;
    tourOperatorAddress: string;
    tourOperatorEmail: string;
    tourOperatorPhone: string;
    tourOperatorLandLine: string;
    tourOperatorContactPreferences: ContactPreference;
    activityStatus: number;
    deletedStatus: number;
    addedBy: string;
    addedDate: string;
    modifiedBy: string;
    modifyDate: string;
}
const getContactPreferenceString = (preference: ContactPreference): string => {
    switch (preference) {
        case ContactPreference.Email:
            return 'Email';
        case ContactPreference.Phone:
            return 'Phone';
        case ContactPreference.Landline:
            return 'Landline';
        default:
            return 'Unknown';
    }
};
const columns: Column<TourOperator>[] = [
    { Header: 'Name', accessor: 'tourOperatorName' },
    { Header: 'Email', accessor: 'tourOperatorEmail' },
    { Header: 'Address', accessor: 'tourOperatorAddress' },
    { Header: 'Phone', accessor: 'tourOperatorPhone' },
    { Header: 'LandLine', accessor: 'tourOperatorLandLine' },
    {
        Header: 'Contact Preference',
        accessor: 'tourOperatorContactPreferences',
        Cell: ({ value }: { value: ContactPreference }) => getContactPreferenceString(value),
    },
    // { Header: 'Added By', accessor: 'addedBy' },
    // { Header: 'Added Date', accessor: 'addedDate' },
    // { Header: 'Modified By', accessor: 'modifiedBy' },
    // { Header: 'Modify Date', accessor: 'modifyDate' },
];

export default function TourOperatorManagement() {
    const [tourOperators, setTourOperators] = useState<TourOperator[]>([]);
    const userString = localStorage.getItem('user');
    const userData = userString ? JSON.parse(userString) : null;
    const token = userData.token
    
    useEffect(() => {

        fetch('https://localhost:44355/api/AirlineManagerOperations/GetTourOperators',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `bearer ${token}`
              },
        })
            .then((response) => response.json())
            .then((data) => setTourOperators(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    const data = tourOperators;

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);


    return (
        <div className="content"> <div><button className='flex float-right bg-blue-500 text-white p-1 rounded hover:bg-blue-700 mt-4'><Link href="/airlineManager/addTourOperator">Add TO</Link><br /></button></div>
            <h1 className="text-3xl font-bold flex justify-center mb-4">Tour Operator Management Page</h1>

            <div className="overflow-x-auto">
            <table {...getTableProps()} className="min-w-full border border-gray-300">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className="py-2 px-4 border-b">
                                        {column.render('Header')}
                                        <span className="ml-2">
                                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="hover:bg-gray-50">
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()} className="py-2 px-4 border-b">{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

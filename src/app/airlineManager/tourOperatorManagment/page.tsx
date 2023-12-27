"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  TableSortLabel,
  TablePagination,
  TextField
} from '@mui/material';

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

const TourOperatorManagement = () => {
  const router = useRouter();
  const [tourOperators, setTourOperators] = useState<TourOperator[]>([]);
  const [allTourOperators, setAllTourOperators] = useState<TourOperator[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [token, setToken] = useState<string>('');
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filteredData = allTourOperators.filter((operator) => {
      const operatorNameLowerCase = operator.tourOperatorName.toLowerCase();
      return operatorNameLowerCase.includes(searchTerm.toLowerCase());
    });

    setTotalRows(filteredData.length);
    setTourOperators(filteredData.slice(0, rowsPerPage));
    setPage(0);
    setPageCount(Math.ceil(filteredData.length / rowsPerPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10) || 5;
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    setPageCount(Math.ceil(totalRows / newRowsPerPage));
  };

  const handleSort = (column: keyof TourOperator) => {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);

    const sortedOperators = [...allTourOperators].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) {
        return newSortOrder === 'asc' ? -1 : 1;
      }

      if (aValue > bValue) {
        return newSortOrder === 'asc' ? 1 : -1;
      }

      return 0;
    });

    setAllTourOperators(sortedOperators);
    setTourOperators(sortedOperators.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
    setPage(0);
    setPageCount(Math.ceil(sortedOperators.length / rowsPerPage));
  };

  useEffect(() => {
    fetchTourOperators();
  }, [page, rowsPerPage, sortColumn, sortOrder, searchTerm, token]);

  const fetchTourOperators = async () => {
    try {
      const response = await fetch(`https://localhost:44355/api/AirlineManagerOperations/GetTourOperators?sortColumn=${sortColumn}&sortOrder=${sortOrder}&searchTerm=${searchTerm}&page=${page + 1}&pageSize=${rowsPerPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTotalRows(data.totalRows);
        setTourOperators(data.tourOperators);
        setPageCount(data.pageCount);
      } else {
        console.error('Failed to fetch data.');
      }
    } catch (error) {
      setTourOperators([]);
      setTotalRows(0);
      setPageCount(0);
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = async (tourOperatorId: string) => {
    router.push(`editTourOperator/${tourOperatorId}`);
  };

  const handleDelete = async (tourOperatorId: string) => {
    try {
      const response = await fetch(`https://localhost:44355/api/AirlineManagerOperations/DeleteTourOperator/${tourOperatorId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log(`Tour operator with ID ${tourOperatorId} deleted successfully.`);
        fetchTourOperators();
      } else {
        console.error(`Failed to delete tour operator with ID ${tourOperatorId}.`);
      }
    } catch (error) {
      console.error('Error during deletion:', error);
    }
  };

  return (
    <div className="content">
      <div>
        <button className='flex float-right bg-blue-500 text-white p-1 rounded hover:bg-blue-700 mt-4'>
          <Link href="/airlineManager/addTourOperator">Add TO</Link><br />
        </button>
      </div>
      <h1 className="text-3xl font-bold flex justify-center mb-4">Tour Operator Management Page</h1>
      <div className="overflow-x-auto">
        <div className="mb-4">
          <TextField
            label="Search example: Email"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table className="min-w-full border border-gray-300">
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === 'tourOperatorName'}
                    direction={sortOrder}
                    onClick={() => handleSort('tourOperatorName')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === 'tourOperatorEmail'}
                    direction={sortOrder}
                    onClick={() => handleSort('tourOperatorEmail')}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === 'tourOperatorAddress'}
                    direction={sortOrder}
                    onClick={() => handleSort('tourOperatorAddress')}
                  >
                    Address
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === 'tourOperatorPhone'}
                    direction={sortOrder}
                    onClick={() => handleSort('tourOperatorPhone')}
                  >
                    Phone
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === 'tourOperatorLandLine'}
                    direction={sortOrder}
                    onClick={() => handleSort('tourOperatorLandLine')}
                  >
                    LandLine
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === 'tourOperatorContactPreferences'}
                    direction={sortOrder}
                    onClick={() => handleSort('tourOperatorContactPreferences')}
                  >
                    Contact Preference
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {tourOperators && tourOperators.map((operator:TourOperator) => (
                <TableRow className="hover:bg-gray-50" key={operator.tourOperatorId}>
                  <TableCell>{operator.tourOperatorName}</TableCell>
                  <TableCell>{operator.tourOperatorEmail}</TableCell>
                  <TableCell>{operator.tourOperatorAddress}</TableCell>
                  <TableCell>{operator.tourOperatorPhone}</TableCell>
                  <TableCell>{operator.tourOperatorLandLine}</TableCell>
                  <TableCell>{getContactPreferenceString(operator.tourOperatorContactPreferences)}</TableCell>
                  <TableCell>
                    <Stack spacing={2} direction="row">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(operator.tourOperatorId)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDelete(operator.tourOperatorId)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TourOperatorManagement;

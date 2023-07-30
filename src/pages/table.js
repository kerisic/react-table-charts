import React from "react";
import { useState, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => (row.first_name ? row.first_name : "n/a"),
        id: "first_Name",
        header: "First Name",
        enableSorting: false,
      },
      {
        accessorFn: (row) => (row.last_name ? row.last_name : "n/a"),
        id: "last_name",
        header: "Last Name",
        enableSorting: false,
      },
      {
        accessorFn: (row) => (row.email ? row.email : "n/a"),
        id: "email",
        header: "Email",
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => {
          const parts = row.date_of_birth.split("/");
          return new Date(
            parts[2],
            parts[1] - 1,
            parts[0]
          ).toLocaleDateString();
        },
        id: "dateOfBirth",
        header: "Date of Birth",
        enableColumnFilter: false,
        enableEditing: false,
        size: 100,
      },
      {
        accessorFn: (row) => (row.industry ? row.industry : "n/a"),
        id: "industry",
        header: "Industry",
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorFn: (row) => (row.salary ? row.salary?.toFixed(2) : "n/a"),
        id: "salary",
        header: "Salary",
        enableColumnFilter: false,
        enableEditing: false,
        size: 150,
      },
      {
        accessorKey: "years_of_experience",
        header: "Years of Experience",
        enableSorting: false,
        enableColumnFilter: false,
        enableEditing: false,
      },
    ],
    []
  );

  const buildTable = () => {
    fetch("./mockData.json")
      .then((res) => res.json())
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    buildTable();
  }, []);

  return (
    <MaterialReactTable
      columns={columns}
      state={{ isLoading: loading }}
      initialState={{ showColumnFilters: true }}
      data={data ?? []}
    />
  );
};

export default Table;

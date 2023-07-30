import React from "react";
import { useState, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Unique Identifier",
        enableSorting: false,
        enableColumnFilter: false,
        enableEditing: false,
      },
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

  const handleResponseNullValues = (res) => {
    return res.map((person) => {
      person.industry = person.industry === "n/a" ? null : person.industry;
      person.salary = person.salary ? parseFloat(person.salary) : null;
      return person;
    });
  };

  const handleNormalSort = (res, id) => {
    res.sort((a, b) => {
      return a[`${id}`] === b[`${id}`]
        ? 0
        : a[`${id}`] === null
        ? 1
        : b[`${id}`] === null
        ? -1
        : a[`${id}`] < b[`${id}`]
        ? -1
        : 1;
    });
  };

  const handleDateSort = (res) => {
    res.sort((a, b) => {
      a = a.date_of_birth.split("/").reverse().join("");
      b = b.date_of_birth.split("/").reverse().join("");
      return a > b ? 1 : a < b ? -1 : 0;
    });
  };

  const handleSorting = (sorting, res) => {
    const id = sorting[0].id;
    const isDesc = sorting[0].desc;
    if (id === "industry" || id === "salary") {
      handleNormalSort(res, id);
    } else if (id === "dateOfBirth") {
      handleDateSort(res);
    }
    if (isDesc) {
      res.reverse();
    }
    return res;
  };

  const buildTable = () => {
    fetch("./mockData.json")
      .then((res) => res.json())
      .then((res) => {
        res = handleResponseNullValues(res);
        if (sorting?.length) {
          res = handleSorting(sorting, res);
        }
        setData(res);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    buildTable();
  }, [sorting]);

  return (
    <MaterialReactTable
      manualSorting
      columns={columns}
      state={{ sorting, isLoading: loading }}
      initialState={{ showColumnFilters: true }}
      data={data ?? []}
      onSortingChange={setSorting}
    />
  );
};

export default Table;

"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Suspense } from "react"; // Import Suspense
import { useSearchParams } from "next/navigation";
import Filter from "@/components/inventory/Filter";
import InventoryService from "@/services/InventoryService";
import { BsThreeDotsVertical } from "react-icons/bs";
import Editform from "@/app/(pages)/kitchen/inventory/editform";
import { useDispatch } from "react-redux";
import { setSelectedItem } from "@/redux/features/selected_item/selectedItemSlice";
import { useSellerDetails } from "../../../../../../(helpers)/Helpers";
import useFetchData from "../../../../../../hooks/hooks";
import Spinner from "@/components/indicators/Spinner";
import { useRouter } from "next/navigation";

// Move the component that uses useSearchParams into a separate component
function TableComponent() {
  const searchParams = useSearchParams();
  const [newInventory, setNewInventory] = useState(false);

  useEffect(() => {
    if (searchParams.get("newInventory") === "success") {
      setNewInventory(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (newInventory) {
      setTimeout(() => {
        setNewInventory(false);
      }, 3000);
    }
  }, [newInventory]);

  return (
    <>
      {newInventory && (
        <div role='alert' className='alert alert-success'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current shrink-0 h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>Your inventory has been added!</span>
        </div>
      )}
    </>
  );
}

// Main Page Component
export default function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [eventData, setEventData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editInventory, setEditInventory] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownRowId, setDropdownRowId] = useState(null);
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { details } = useSellerDetails;
  const { data, error } = useFetchData();
  const [itemId, setItemId] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch inventory data on initial load or when activeTab changes
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("auth_token");
      try {
        setLoading(true);
        const response = await fetch(
          // `http://localhost:5000/inventory/me`,
          `https://foodflow-server-gkv6.vercel.app/inventory/me`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        const newData = data.data;
        //console.log("Fetched data:", data);

        if (newData && Array.isArray(newData)) {
          setEventData(newData);
          setFilteredData(newData);
          newData.forEach((item) => {
            //console.log("Item ID:", item._id);
          });
        } else {
          console.error("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [activeTab, data]);

  const handleSearch = (value) => {
    const filtered = eventData.filter((event) =>
      event.category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const openModalForRow = (rowId) => {
    const selectedItem = eventData.find((row) => row._id === rowId);
    setCurrentItem(selectedItem);
    dispatch(setSelectedItem(selectedItem));
    setSelectedRowId(rowId);
    setIsEdit(true);
  };

  const handleDelete = (rowId) => {
    const newList = eventData.filter((row) => row._id !== rowId);
    setEventData(newList);
    setFilteredData(newList);
  };

  const closeModal = () => {
    setSelectedRowId(null);
    setIsEdit(false);
  };

  const handleEditDetails = (rowId) => {
    const selectedItem = eventData.find((row) => row._id === rowId);
    setCurrentItem(selectedItem);
    setEditInventory(true);
    setDropdownVisible(false);
  };

  const handleViewDetails = (rowId) => {
    const selectedItem = eventData.find((row) => row._id === rowId);
    setCurrentItem(selectedItem);
    setDropdownVisible(false);
    router.push(`/kitchen/inventory/${rowId}`);
  };

  const openDropdownForRow = (rowId) => {
    setDropdownVisible(true);
    setDropdownRowId(rowId);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
    setDropdownRowId(null);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    if (isEdit) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isEdit]);

  return (
    <>
      {loading && (
        <div className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50'>
          <Spinner />
        </div>
      )}
      <div className='px-8'>
        {/* Wrap TableComponent in Suspense */}
        <Suspense fallback={<div>Loading...</div>}>
          <TableComponent />
        </Suspense>

        <section className='border-2 w-[80vw] h-[80vh] border-zinc-400 rounded-2xl mt-10 p-6 overflow-scroll'>
          {/* Rest of your code */}
        </section>
      </div>

      <Editform
        isVisible={editInventory}
        onClose={() => setEditInventory(false)}
        data={currentItem || {}}
      />
    </>
  );
}